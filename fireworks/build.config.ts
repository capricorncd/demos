import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  base: './',
  build: {
    emptyOutDir: true,
    outDir: resolve(__dirname, '../../capricorncd.github.io/demos/fireworks'),
    assetsDir: './'
  }
})
