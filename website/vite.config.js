import { defineConfig, splitVendorChunkPlugin } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  base: './',
  publicDir: './public',
  server: {
    open: true
  },
  resolve: {
    alias: {
      '~': resolve('./')
    }
  },
  build: {
    outDir: resolve(__dirname, '../../capricorncd.github.io')
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "./assets/scss/constants.scss";'
      }
    }
  },
  plugins: [react(), splitVendorChunkPlugin()]
})
