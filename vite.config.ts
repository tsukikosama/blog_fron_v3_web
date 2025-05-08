import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/upload': {
        target: 'http://8.138.16.124:8083',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/upload/, '/upload')   }
    }
  }
})
