import { dashboardView } from './dashboard/dashboard.js';
import { colaboradoresView } from './colaboradores/colaboradores.js';
import { placeholderView } from './placeholder.js';

// Fonte única da verdade dos módulos: sidebar e roteador leem esta lista.
// Para adicionar um módulo novo, basta incluir um item aqui.
export const modules = [
  { id: 'dashboard', label: 'Dashboard', icon: 'dashboard', render: dashboardView },
  { id: 'colaboradores', label: 'Colaboradores', icon: 'users', render: colaboradoresView },
  { id: 'afastamentos', label: 'Afastamentos e INSS', icon: 'calendar' },
  { id: 'juridico', label: 'Gestão jurídica', icon: 'scale' },
  { id: 'pagamentos', label: 'Pagamentos', icon: 'wallet' },
  { id: 'documentacao', label: 'Documentação', icon: 'folder' },
  { id: 'relatorios', label: 'Relatórios', icon: 'chart' },
  { id: 'dados', label: 'Central de dados', icon: 'database' },
].map((m) => ({ render: () => placeholderView(m.label), ...m }));
