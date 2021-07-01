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
    // https://github.com/http-party/node-http-proxy#options
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        // target: 'https://api.github.com/',
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, '')
      },
    }
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
