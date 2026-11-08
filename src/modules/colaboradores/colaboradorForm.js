import { h } from '../../utils/dom.js';
import { openModal } from '../../components/Modal.js';
import { toast } from '../../components/toast.js';
import { salvar, SITUACOES } from '../../services/colaboradorService.js';

const field = (label, name, input, extra = '') =>
  h('label', { class: `field ${extra}` }, h('span', { class: 'field__label' }, label), input,
    h('small', { class: 'field__error', 'data-error': name }));
const input = (name, type, value, attrs = {}) => h('input', { class: 'input', name, type, value: value ?? '', ...attrs });

export function openColaboradorForm(colab, onSaved) {
  const c = colab ?? {};
  const situacao = h('select', { class: 'input', name: 'situacao' },
    h('option', { value: '' }, 'Selecione…'),
    Object.entries(SITUACOES).map(([v, l]) => h('option', { value: v, selected: c.situacao === v }, l)));

  const experiencia = h('div', { class: 'form__grid form__full', hidden: c.situacao !== 'registrado' },
    field('Prazo de experiência (dias)', 'experienciaDias', input('experienciaDias', 'number', c.experienciaDias ?? 45, { min: 0, step: 1 })),
    field('Prazo de prorrogação (dias)', 'prorrogacaoDias', input('prorrogacaoDias', 'number', c.prorrogacaoDias ?? 45, { min: 0, step: 1 })));
  situacao.addEventListener('change', () => { experiencia.hidden = situacao.value !== 'registrado'; });

  const form = h('form', { class: 'form', novalidate: true },
    h('div', { class: 'form__grid' },
      field('Nome', 'nome', input('nome', 'text', c.nome, { autocomplete: 'off' }), 'form__full'),
      field('CPF', 'cpf', input('cpf', 'text', c.cpf, { inputmode: 'numeric', placeholder: 'somente números' })),
      field('Data de nascimento', 'nascimento', input('nascimento', 'date', c.nascimento)),
      field('Função', 'funcao', input('funcao', 'text', c.funcao)),
      field('Salário (R$)', 'salario', input('salario', 'number', c.salario, { min: 0, step: '0.01' })),
      field('Telefone', 'telefone', input('telefone', 'tel', c.telefone, { placeholder: 'DDD + número' })),
      field('Situação', 'situacao', situacao),
      field('Data de admissão', 'admissao', input('admissao', 'date', c.admissao)),
      experiencia,
      field('Observação', 'observacao', h('textarea', { class: 'input', name: 'observacao', rows: 3 }, c.observacao ?? ''), 'form__full')),
    h('div', { class: 'form__actions' },
      h('button', { type: 'button', class: 'btn', onClick: () => dlg.close() }, 'Cancelar'),
      h('button', { type: 'submit', class: 'btn btn--primary' }, colab ? 'Salvar alterações' : 'Cadastrar')));

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    try {
      const r = await salvar(Object.fromEntries(new FormData(form)), colab?.id);
      form.querySelectorAll('[data-error]').forEach((el) => { el.textContent = r.errors?.[el.dataset.error] ?? ''; });
      if (!r.ok) return;
      dlg.close();
      toast(colab ? 'Colaborador atualizado.' : 'Colaborador cadastrado.');
      onSaved();
    } catch (err) {
      console.error(err);
      toast('Erro ao gravar no banco local.', 'erro');
    }
  });

  const dlg = openModal(colab ? 'Editar colaborador' : 'Novo colaborador', form);
}
