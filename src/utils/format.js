// Funções puras de formatação e datas (sem DOM, fáceis de testar).
export const onlyDigits = (v) => String(v ?? '').replace(/\D/g, '');
export const formatCpf = (v) => onlyDigits(v).replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
export function formatPhone(v) {
  const d = onlyDigits(v);
  if (d.length === 11) return d.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  if (d.length === 10) return d.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
  return d;
}
export const formatBRL = (n) => Number(n).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
export const formatDate = (iso) => (iso ? iso.split('-').reverse().join('/') : '—');
// Datas são guardadas como texto 'AAAA-MM-DD'. Somamos em UTC para evitar erro de fuso/horário de verão.
export function addDays(iso, days) {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d + days)).toISOString().slice(0, 10);
}
export const today = () => new Date().toLocaleDateString('sv-SE'); // AAAA-MM-DD no fuso local
export const normalizeText = (s) => String(s ?? '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
