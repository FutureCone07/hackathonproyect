# 🚀 Proyecto Hackathon - Equipo Mutualists

Repositorio oficial del proyecto desarrollado por Mutualists. Esta aplicación utiliza una arquitectura moderna separada en Frontend y Backend, integrando herramientas de Inteligencia Artificial y bases de datos en tiempo real, optimizada para un despliegue ágil en la nube mediante contenedores.

---

## 🛠️ Stack Tecnológico

**Frontend (Interfaz de Usuario):**
* **Core:** React 18, Vite.
* **Estilos & UI:** Bootstrap 5, React-Bootstrap.
* **Enrutamiento:** React Router DOM.
* **BaaS:** Firebase 10 (Client SDK).

**Backend (Lógica e Inteligencia Artificial):**
* **Core:** Node.js, Express.
* **Lenguaje:** TypeScript (`ts-node-dev`).
* **Inteligencia Artificial:** `@google/generative-ai` (Gemini API).
* **Administración:** Firebase Admin SDK.

**Infraestructura y Despliegue:**
* **Contenedores:** Docker & Docker Compose.
* **Nube:** Google Cloud Platform (Compute Engine / Ubuntu).

---

## ⚙️ Entorno de Desarrollo Local (Nativo)

Para contribuir al código de forma fluida y evitar bloqueos de red en entornos Windows, levanta los servicios nativamente:

### 1. Iniciar el Backend
El servidor maneja la comunicación con Gemini y Firebase Admin.
```bash
cd backend
npm install
npm run dev
```
El servidor API estará escuchando en el puerto 5000.

## 🐳 Despliegue en Producción (Docker)

El repositorio incluye la configuración de infraestructura como código (Archivos Dockerfile y docker-compose.yml) lista para ejecutarse en servidores Linux de alto rendimiento.



```bash
# Limpiar el sistema e iniciar la construcción de las imágenes
docker system prune -f
docker-compose up -d --build
```
* El Frontend de producción quedará expuesto en el puerto 3000.

* El Backend de producción quedará expuesto en el puerto 5000.

## 🔐 Configuración de Variables de Entorno

Antes de ejecutar el proyecto, es necesario configurar las claves de las APIs. Crea un archivo llamado .env dentro de la carpeta /backend con la siguiente estructura:

```bash
GEMINI_API_KEY=tu_clave_de_google_ai_aqui
```
(Nota: El archivo .env está ignorado por Git por motivos de seguridad).

## 👥 Equipo AxoPunk

* Angel David Romero - Arquitectura Cloud, Despliegue y Liderazgo Técnico.

* Axel Yahir Quirino - Frontend / Firebase.

* Kevin Andres Olguin - Prompts / Backend.
