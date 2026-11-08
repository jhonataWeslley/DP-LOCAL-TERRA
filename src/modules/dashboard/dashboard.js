import { h } from '../../utils/dom.js';
import { icon } from '../../utils/icons.js';
import { indicadores, pendencias, atividades, vencimentos } from './mockData.js';

const card = (i, idx) =>
  h('article', { class: `stat-card stat-card--${idx + 1}` },
    h('div', { class: 'stat-card__icon' }, icon(i.icone, 22)),
    h('div', {},
      h('p', { class: 'stat-card__label' }, i.rotulo),
      h('p', { class: 'stat-card__value' }, i.valor),
      h('p', { class: 'stat-card__hint' }, i.detalhe),
    ),
  );

const panel = (titulo, ...conteudo) =>
  h('section', { class: 'panel' }, h('h3', { class: 'panel__title' }, titulo), ...conteudo);

export function dashboardView() {
  return h('div', { class: 'dashboard' },
    h('div', { class: 'notice' }, icon('shield', 18), 'Dados fictícios para validação de layout.'),
    h('div', { class: 'grid grid--4' }, indicadores.map(card)),
    h('div', { class: 'grid grid--2' },
      panel('Pendências',
        h('ul', { class: 'list' }, pendencias.map((p) =>
          h('li', {}, h('span', {}, p.titulo), h('span', { class: `badge badge--${p.prioridade}` }, p.prioridade))))),
      panel('Atividades recentes',
        h('ul', { class: 'list' }, atividades.map((a) =>
          h('li', {}, h('span', {}, a.texto), h('span', { class: 'muted' }, a.quando))))),
    ),
    panel('Próximos vencimentos',
      h('div', { class: 'table-wrap' },
        h('table', { class: 'table' },
          h('thead', {}, h('tr', {}, h('th', {}, 'Descrição'), h('th', {}, 'Data'), h('th', {}, 'Situação'))),
          h('tbody', {}, vencimentos.map((v) =>
            h('tr', {}, h('td', {}, v.descricao), h('td', {}, v.data), h('td', {}, v.status))))))),
  );
}
