import { h } from '../../utils/dom.js';
import { confirmDialog } from '../../components/Modal.js';
import { toast } from '../../components/toast.js';
import { listar, excluir, calcularPrazos, SITUACOES } from '../../services/colaboradorService.js';
import { formatCpf, formatDate, formatPhone, formatBRL, normalizeText, onlyDigits, today, addDays } from '../../utils/format.js';
import { openColaboradorForm } from './colaboradorForm.js';

function experienciaCell(c) {
  const { fimExperiencia, fimProrrogacao } = calcularPrazos(c);
  const fim = fimProrrogacao ?? fimExperiencia;
  if (!fim) return h('span', { class: 'muted' }, '—');
  const hoje = today();
  const estado = fim < hoje ? ['encerrada', 'baixa'] : fim <= addDays(hoje, 10) ? ['vence em breve', 'alta'] : ['em curso', 'media'];
  return h('div', {}, `até ${formatDate(fim)}`, ' ', h('span', { class: `badge badge--${estado[1]}` }, estado[0]));
}

export function colaboradoresView() {
  let lista = [];
  const filtro = { busca: '', situacao: '' };
  const tbody = h('tbody');
  const total = h('span', { class: 'muted' });

  const draw = () => {
    const q = normalizeText(filtro.busca);
    const qDigits = onlyDigits(filtro.busca);
    const itens = lista
      .filter((c) => !filtro.situacao || c.situacao === filtro.situacao)
      .filter((c) => !q || normalizeText(`${c.nome} ${c.funcao}`).includes(q) || (qDigits && c.cpf.includes(qDigits)))
      .sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'));
    total.textContent = `${itens.length} de ${lista.length} colaborador(es)`;
    tbody.replaceChildren(...(itens.length ? itens.map(row) : [h('tr', {}, h('td', { colspan: 7, class: 'table__empty' }, lista.length ? 'Nenhum resultado para o filtro.' : 'Nenhum colaborador cadastrado.'))]));
  };

  const row = (c) => h('tr', {},
    h('td', {}, h('strong', {}, c.nome), h('div', { class: 'muted' }, formatCpf(c.cpf))),
    h('td', {}, c.funcao, h('div', { class: 'muted' }, formatPhone(c.telefone))),
    h('td', {}, h('span', { class: 'badge badge--sit' }, SITUACOES[c.situacao])),
    h('td', {}, formatBRL(c.salario)),
    h('td', {}, formatDate(c.admissao)),
    h('td', {}, experienciaCell(c)),
    h('td', { class: 'actions' },
      h('button', { class: 'btn btn--small', onClick: () => openColaboradorForm(c, load) }, 'Editar'),
      h('button', { class: 'btn btn--small btn--danger-outline', onClick: () => remover(c) }, 'Excluir')));

  async function remover(c) {
    if (!(await confirmDialog(`Excluir ${c.nome}? Esta ação não pode ser desfeita.`))) return;
    try { await excluir(c.id); toast('Colaborador excluído.'); load(); }
    catch (err) { console.error(err); toast('Erro ao excluir.', 'erro'); }
  }

  async function load() {
    try { lista = await listar(); draw(); }
    catch (err) { console.error(err); toast('Não foi possível ler o banco local.', 'erro'); }
  }

  const view = h('div', { class: 'dashboard' },
    h('div', { class: 'toolbar' },
      h('input', { class: 'input toolbar__search', type: 'search', placeholder: 'Buscar por nome, função ou CPF', onInput: (e) => { filtro.busca = e.target.value; draw(); } }),
      h('select', { class: 'input', 'aria-label': 'Filtrar por situação', onChange: (e) => { filtro.situacao = e.target.value; draw(); } },
        h('option', { value: '' }, 'Todas as situações'),
        Object.entries(SITUACOES).map(([v, l]) => h('option', { value: v }, l))),
      total,
      h('button', { class: 'btn btn--primary toolbar__add', onClick: () => openColaboradorForm(null, load) }, '+ Novo colaborador')),
    h('section', { class: 'panel' }, h('div', { class: 'table-wrap' }, h('table', { class: 'table' },
      h('thead', {}, h('tr', {}, ['Colaborador', 'Função / Telefone', 'Situação', 'Salário', 'Admissão', 'Experiência', ''].map((t) => h('th', {}, t)))),
      tbody))));

  load();
  return view;
}
