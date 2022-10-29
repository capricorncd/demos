import path from 'path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [],
  build: {
    outDir: path.resolve(
      __dirname,
      '../../capricorncd.github.io/demos/css-solar-system'
    ),
  },
});