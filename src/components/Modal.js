import { h } from '../utils/dom.js';

// Usa o elemento nativo <dialog>: já trata foco, tecla Esc e fundo bloqueado.
export function openModal(title, body) {
  const dlg = h('dialog', { class: 'modal' },
    h('header', { class: 'modal__head' }, h('h2', {}, title),
      h('button', { type: 'button', class: 'btn btn--ghost', 'aria-label': 'Fechar', onClick: () => dlg.close() }, '✕')),
    h('div', { class: 'modal__body' }, body));
  dlg.addEventListener('close', () => dlg.remove());
  document.body.append(dlg);
  dlg.showModal();
  return dlg;
}

export function confirmDialog(message, confirmLabel = 'Excluir') {
  return new Promise((resolve) => {
    let answer = false;
    const done = (v) => { answer = v; dlg.close(); };
    const dlg = openModal('Confirmar ação', h('div', {},
      h('p', {}, message),
      h('div', { class: 'form__actions' },
        h('button', { type: 'button', class: 'btn', onClick: () => done(false) }, 'Cancelar'),
        h('button', { type: 'button', class: 'btn btn--danger', onClick: () => done(true) }, confirmLabel))));
    dlg.addEventListener('close', () => resolve(answer));
  });
}
