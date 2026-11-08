import { h } from '../utils/dom.js';

export function toast(message, type = 'ok') {
  let box = document.getElementById('toasts');
  if (!box) { box = h('div', { id: 'toasts', class: 'toasts', 'aria-live': 'polite' }); document.body.append(box); }
  const t = h('div', { class: `toast toast--${type}` }, message);
  box.append(t);
  setTimeout(() => t.remove(), 3500);
}
