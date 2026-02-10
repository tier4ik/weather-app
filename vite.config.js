import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: 'docs',
    emptyOutDir: true,
    assetsInlineLimit: 0
  },
  base: '/weather-app/'
});
