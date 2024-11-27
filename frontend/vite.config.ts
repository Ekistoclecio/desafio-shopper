import { defineConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react-swc';
import dotenv from 'dotenv';

dotenv.config();

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  define: {
    __ENV__: JSON.stringify(process.env),
  },
  server: {
    host: '0.0.0.0', // Permite que o container seja acessível externamente
    port: 5173, // Certifique-se de que a porta está correta
  },
});
