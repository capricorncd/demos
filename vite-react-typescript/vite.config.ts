import { resolve } from 'path'
import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  resolve: {
    alias: {
      '@': resolve('src/'),
      '~': resolve('static/'),
    }
  },
  server: {
    host: '0.0.0.0',
  },
  plugins: [reactRefresh()],
  css:{
    preprocessorOptions: {
      scss: {
        additionalData: `@import "src/assets/scss/vars/index.scss";`
      }
    }
  }
})
