import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  base: './',
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'Fireworks',
      fileName: (format) => `fireworks.${format}.js`,
    },
  },
  server: {
    open: true,
  },
})