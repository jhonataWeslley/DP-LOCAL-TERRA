import { h } from '../utils/dom.js';
import { icon } from '../utils/icons.js';
import logoUrl from '../assets/logo-terra.png';

export function Sidebar(modules, onNavigate) {
  const links = new Map();
  const nav = h('nav', { class: 'sidebar__nav', 'aria-label': 'Navegação principal' },
    modules.map((m) => {
      const a = h('a', { href: `#/${m.id}`, class: 'sidebar__link', onClick: () => onNavigate?.() },
        icon(m.icon), h('span', {}, m.label));
      links.set(m.id, a);
      return a;
    }));

  const element = h('aside', { class: 'sidebar', id: 'sidebar' },
    h('div', { class: 'sidebar__brand' },
      h('img', { class: 'sidebar__logo', src: logoUrl, alt: 'TERRA RH & DP' })),
    nav,
    h('p', { class: 'sidebar__footer' }, 'DP Terra Local · v0.1.0'),
  );

  return {
    element,
    setActive(id) {
      links.forEach((a, key) => {
        a.classList.toggle('is-active', key === id);
        key === id ? a.setAttribute('aria-current', 'page') : a.removeAttribute('aria-current');
      });
    },
  };
}
