import './styles/tokens.css';
import './styles/base.css';
import './styles/layout.css';
import './styles/components.css';

import { h } from './utils/dom.js';
import { modules } from './modules/registry.js';
import { createRouter } from './services/router.js';
import { Sidebar } from './components/Sidebar.js';
import { Header } from './components/Header.js';

const app = document.getElementById('app');
const content = h('main', { class: 'content', id: 'content', tabindex: '-1' });
const backdrop = h('div', { class: 'backdrop', onClick: () => closeMenu() });

const sidebar = Sidebar(modules, () => closeMenu());
const header = Header(() => document.body.classList.toggle('menu-open'));
const closeMenu = () => document.body.classList.remove('menu-open');

app.append(
  h('div', { class: 'shell' }, sidebar.element, backdrop,
    h('div', { class: 'main' }, header.element, content)),
);

const router = createRouter((id) => {
  const mod = modules.find((m) => m.id === id) ?? modules[0];
  sidebar.setActive(mod.id);
  header.setTitle(mod.label);
  document.title = `${mod.label} · DP Terra Local`;
  content.replaceChildren(mod.render());
});

router.start();
