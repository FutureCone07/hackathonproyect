import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    server: {
        port: 5173,
        // Forzamos la IP local para evitar errores de seguridad del navegador
        host: '127.0.0.1'
    }
})