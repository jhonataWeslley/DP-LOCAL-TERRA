import { h } from '../utils/dom.js';

// Tela provisória dos módulos que serão construídos nas próximas fases.
export function placeholderView(label) {
  return h('section', { class: 'empty-state' },
    h('h2', {}, label),
    h('p', {}, 'Este módulo será implementado em uma fase futura.'),
  );
}
