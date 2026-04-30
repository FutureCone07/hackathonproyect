import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    server: {
        port: 5173,
        host: '127.0.0.1',
        proxy: {
            // Todas las peticiones que empiecen con /api se dirigirán al backend
            '/api': {
                target: 'http://localhost:3000',
                changeOrigin: true,
                secure: false,
            }
        }
    }
})