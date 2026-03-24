import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    
    // Ensure GEMINI_API_KEY is picked up from system env if not in .env file
    const processEnv = {
      ...env,
      GEMINI_API_KEY: process.env.GEMINI_API_KEY || env.GEMINI_API_KEY || '',
      API_KEY: process.env.API_KEY || env.API_KEY || ''
    };

    return {
      base: './',
      define: {
        'process.env': processEnv
      },
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
