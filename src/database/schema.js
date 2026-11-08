// Descrição do banco. Ao mudar a estrutura, aumente DB_VERSION e trate a migração em db.js.
export const DB_NAME = 'dp-terra-local';
export const DB_VERSION = 1;

export const STORES = {
  colaboradores: {
    keyPath: 'id',
    indexes: [
      { name: 'nome', keyPath: 'nome' },
      { name: 'cpf', keyPath: 'cpf' },
      { name: 'situacao', keyPath: 'situacao' },
    ],
  },
};
