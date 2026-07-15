import { defineConfig } from 'vite';

export default defineConfig({
  // Set base to your repository name for GitHub Pages
  // e.g. '/motion-website/' or '/' for custom domains
  base: '/',
  root: '.',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
  server: {
    port: 3000,
    open: true,
  },
});
