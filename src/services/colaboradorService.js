import { colaboradoresRepository as repo } from '../database/repositories/colaboradoresRepository.js';
import { isValidCpf } from '../utils/cpf.js';
import { onlyDigits, addDays } from '../utils/format.js';

export const SITUACOES = { registrado: 'Registrado', avulso: 'Avulso', prestador: 'Prestador' };
const MAX_EXPERIENCIA_TOTAL = 90; // CLT art. 445: experiência + prorrogação não pode passar de 90 dias

// Converte o que veio do formulário (tudo texto) para o formato salvo no banco.
export function normalizar(raw) {
  const registrado = raw.situacao === 'registrado';
  const num = (v) => (v === '' || v == null ? null : Number(v));
  return {
    nome: String(raw.nome ?? '').trim().replace(/\s+/g, ' '),
    salario: num(raw.salario),
    funcao: String(raw.funcao ?? '').trim(),
    telefone: onlyDigits(raw.telefone),
    cpf: onlyDigits(raw.cpf),
    nascimento: raw.nascimento || '',
    situacao: raw.situacao || '',
    admissao: raw.admissao || '',
    experienciaDias: registrado ? num(raw.experienciaDias) ?? 0 : 0,
    prorrogacaoDias: registrado ? num(raw.prorrogacaoDias) ?? 0 : 0,
    observacao: String(raw.observacao ?? '').trim(),
  };
}

export function calcularPrazos(c) {
  if (c.situacao !== 'registrado' || !c.admissao || !c.experienciaDias) return { fimExperiencia: null, fimProrrogacao: null };
  const fimExperiencia = addDays(c.admissao, c.experienciaDias - 1);
  const fimProrrogacao = c.prorrogacaoDias ? addDays(fimExperiencia, c.prorrogacaoDias) : null;
  return { fimExperiencia, fimProrrogacao };
}

export function validar(c) {
  const e = {};
  if (c.nome.length < 3) e.nome = 'Informe o nome completo.';
  if (c.salario == null || !(c.salario >= 0)) e.salario = 'Informe um salário válido.';
  if (!c.funcao) e.funcao = 'Informe a função.';
  if (![10, 11].includes(c.telefone.length)) e.telefone = 'Telefone com DDD (10 ou 11 dígitos).';
  if (!isValidCpf(c.cpf)) e.cpf = 'CPF inválido.';
  if (!c.nascimento) e.nascimento = 'Informe a data de nascimento.';
  if (!SITUACOES[c.situacao]) e.situacao = 'Selecione a situação.';
  if (!c.admissao) e.admissao = 'Informe a data de admissão.';
  if (c.situacao === 'registrado') {
    if (!Number.isInteger(c.experienciaDias) || c.experienciaDias < 0) e.experienciaDias = 'Use dias inteiros (0 se não houver).';
    if (!Number.isInteger(c.prorrogacaoDias) || c.prorrogacaoDias < 0) e.prorrogacaoDias = 'Use dias inteiros (0 se não houver).';
    if (!e.experienciaDias && !e.prorrogacaoDias && c.experienciaDias + c.prorrogacaoDias > MAX_EXPERIENCIA_TOTAL)
      e.prorrogacaoDias = `Experiência + prorrogação não pode passar de ${MAX_EXPERIENCIA_TOTAL} dias.`;
  }
  return e;
}

export const listar = () => repo.getAll();
export const excluir = (id) => repo.remove(id);

// Retorna { ok, errors, item }. Quem chama decide como mostrar os erros.
export async function salvar(raw, id = null) {
  const dados = normalizar(raw);
  const errors = validar(dados);
  if (!errors.cpf) {
    const iguais = (await repo.findBy('cpf', dados.cpf)).filter((x) => x.id !== id);
    if (iguais.length) errors.cpf = `CPF já cadastrado (${iguais[0].nome}).`;
  }
  if (Object.keys(errors).length) return { ok: false, errors };

  const agora = new Date().toISOString();
  const existente = id ? await repo.getById(id) : null;
  const item = { ...existente, ...dados, id: existente?.id ?? crypto.randomUUID(), criadoEm: existente?.criadoEm ?? agora, atualizadoEm: agora };
  await repo.save(item);
  return { ok: true, item };
}
