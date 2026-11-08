# DP Terra Local

Plataforma de gestão de Departamento Pessoal com armazenamento local (offline).

## Como executar
```bash
npm install
npm run dev      # desenvolvimento em http://localhost:5173
npm run build    # gera a pasta dist/
npm run preview  # testa o build
```

## Estrutura
- `src/main.js` — ponto de entrada: monta o layout e liga o roteador
- `src/components/` — peças reutilizáveis de interface (Sidebar, Header)
- `src/modules/` — um diretório por módulo + `registry.js` (lista de módulos)
- `src/services/` — serviços (roteador; futuramente backup, criptografia)
- `src/database/` — camada de armazenamento (IndexedDB, a partir da Fase 2)
- `src/utils/` — funções auxiliares (`dom.js`, `icons.js`)
- `src/styles/` — tokens, base, layout e componentes

## Status
Fase 1 — Fundação: layout, sidebar e dashboard com dados fictícios.

## Como abrir
- **Desenvolvimento:** `npm run dev` (nunca abra o `index.html` da raiz por duplo clique: ele aponta para `src/main.js`, que o navegador não executa sozinho).
- **Uso offline:** `npm run build` e abra `dist/index.html` por duplo clique.
- **GitHub Pages:** em Settings → Pages → Source, escolha "GitHub Actions". A cada push na `main`, o workflow `.github/workflows/deploy.yml` roda o build e publica.
