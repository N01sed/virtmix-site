import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // Served from a project page, not the domain root.
  base: '/virtmix-site/',
  plugins: [react()],
  build: {
    target: 'es2022',
    cssCodeSplit: false,
    assetsInlineLimit: 4096,
  },
});
