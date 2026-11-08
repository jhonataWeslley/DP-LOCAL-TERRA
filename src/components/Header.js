import { h } from '../utils/dom.js';
import { icon } from '../utils/icons.js';

export function Header(onMenuClick) {
  const title = h('h1', { class: 'header__title' }, 'Dashboard');
  const element = h('header', { class: 'header' },
    h('button', { class: 'header__menu', 'aria-label': 'Abrir menu', onClick: onMenuClick }, icon('menu', 22)),
    title,
    h('span', { class: 'header__tag' }, 'Armazenamento local'),
  );
  return { element, setTitle: (t) => { title.textContent = t; } };
}
