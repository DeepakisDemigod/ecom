import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    proxy: {
      //'/api/v1': {
      '/api': 'http://localhost:4000'
      //changeOrigin: true,
      //secure: false,
      //rewrite: path => path.replace(/^\/api\/v1/, '')
      //}
    }
  }
});
