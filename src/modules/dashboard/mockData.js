// DADOS FICTÍCIOS apenas para validar o layout. Nenhum dado real de colaboradores.
export const indicadores = [
  { rotulo: 'Colaboradores ativos', valor: '128', detalhe: '+3 no mês', icone: 'users' },
  { rotulo: 'Afastamentos em curso', valor: '9', detalhe: '2 INSS', icone: 'calendar' },
  { rotulo: 'Prazos jurídicos (30 dias)', valor: '5', detalhe: '1 urgente', icone: 'scale' },
  { rotulo: 'Pagamentos a vencer', valor: '14', detalhe: 'próximos 7 dias', icone: 'wallet' },
];

export const pendencias = [
  { titulo: 'Atestado sem anexo — Colaborador 014', prioridade: 'alta' },
  { titulo: 'Prazo de defesa — Processo 0001/2026', prioridade: 'alta' },
  { titulo: 'Revisar férias vencidas — Setor Exemplo', prioridade: 'media' },
  { titulo: 'Atualizar contrato — Colaborador 087', prioridade: 'baixa' },
];

export const atividades = [
  { texto: 'Cadastro do Colaborador 128 criado', quando: 'Hoje, 09:12' },
  { texto: 'Afastamento 0045 encerrado', quando: 'Ontem, 16:40' },
  { texto: 'Backup exportado', quando: '05/11, 18:05' },
  { texto: 'Audiência 0007 reagendada', quando: '04/11, 11:30' },
];

export const vencimentos = [
  { descricao: 'Rescisão — Colaborador 032', data: '10/11/2026', status: 'Pendente' },
  { descricao: 'Pensão — Colaborador 056', data: '12/11/2026', status: 'Agendado' },
  { descricao: 'Acordo trabalhista 0003', data: '15/11/2026', status: 'Pendente' },
];
