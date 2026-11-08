import { defineConfig } from 'vite';

// Navegadores bloqueiam <script type="module"> quando a página é aberta por duplo clique (file://).
// Este plugin troca por um script comum no build, para dist/index.html abrir direto.
const compatArquivoLocal = () => ({
  name: 'compat-arquivo-local',
  apply: 'build',
  enforce: 'post',
  transformIndexHtml: (html) =>
    html
      .replace(/<script type="module" crossorigin/g, '<script defer')
      .replace(/<link rel="stylesheet" crossorigin/g, '<link rel="stylesheet"'),
});

export default defineConfig({
  base: './', // caminhos relativos: funciona em qualquer pasta e no GitHub Pages
  plugins: [compatArquivoLocal()],
  build: { rollupOptions: { output: { format: 'iife', inlineDynamicImports: true } } },
  server: { port: 5173, open: true },
});
