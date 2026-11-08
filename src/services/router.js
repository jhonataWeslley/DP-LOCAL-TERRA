// Roteador por hash (#/colaboradores). Funciona offline e sem servidor,
// pois não precisa de configuração de rotas no servidor.
export function createRouter(onChange) {
  const current = () => location.hash.replace(/^#\/?/, '') || 'dashboard';
  const notify = () => onChange(current());
  window.addEventListener('hashchange', notify);
  return {
    start: notify,
    navigate: (id) => { location.hash = `#/${id}`; },
    current,
  };
}
