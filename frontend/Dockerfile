FROM node:20-slim

WORKDIR /app

# Copiamos los archivos de dependencias primero para usar el caché
COPY package*.json ./

# Configuramos npm para que sea más resistente a fallos de red (ECONNRESET)
RUN npm config set fetch-retries 5 && \
    npm config set fetch-retry-mintimeout 20000 && \
    npm config set fetch-retry-maxtimeout 120000

RUN npm install --no-audit --no-fund --legacy-peer-deps

# Copiamos el código de React
COPY . .

# Vite usa el puerto 5173 por defecto
EXPOSE 5173

# El flag --host es VITAL para que Docker se vea en Windows
CMD ["npm", "run", "dev"]