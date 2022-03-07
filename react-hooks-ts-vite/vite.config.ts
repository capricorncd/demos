/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2021-07-23 14:14 (GMT+0900)
 */
import { resolve } from 'path'
import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import eslintPlugin from 'vite-plugin-eslint'

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
    port: 4000,
    // https://github.com/http-party/node-http-proxy#options
    proxy: {
      // '/api': {
      //   target: 'http://localhost:8080',
      //   // target: 'https://api.github.com/',
      //   changeOrigin: true,
      //   // rewrite: (path) => path.replace(/^\/api/, '')
      // },
    }
  },
  plugins: [
    reactRefresh(),
    eslintPlugin({fix: true}),
  ],
  css:{
    preprocessorOptions: {
      scss: {
        additionalData: `@import "src/assets/scss/vars/index.scss";`
      }
    }
  }
})
