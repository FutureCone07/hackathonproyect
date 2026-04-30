import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors"; // <-- 1. IMPORTAMOS CORS
import { procesarMensaje } from "./backend/APIS/MCP/mcp.ts";
import { cargarDatosPrueba } from "./backend/database/test-db.ts"; 

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// <-- 2. ACTIVAMOS CORS (¡ESTO SOLUCIONA EL ERROR!)
app.use(cors()); 

app.use(express.json()); 
app.use(express.static(path.join(__dirname, "frontend", "public")));

app.get("/", (_req: any, res: any) => {
  res.sendFile(path.join(__dirname, "frontend", "public", "main.html"));
});

// Ruta del Chatbot
app.post("/api/chat", async (req: any, res: any) => {
    try {
        const mensajeDelAlumno = req.body.mensaje;
        const respuesta = await procesarMensaje(mensajeDelAlumno);
        
        res.json({ tutor: respuesta });
    } catch (error) {
        console.error("Error en el chat:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

// Ruta para el Dashboard de los Maestros (Asegúrate de agregarla para que funcione la vista de Dashboard)
import { collection, getDocs } from "firebase/firestore";
import { db } from "./backend/database/firebase.ts"; // Verifica esta ruta

app.get("/api/alertas", async (_req: any, res: any) => {
    try {
        const querySnapshot = await getDocs(collection(db, "alertas_tempranas"));
        const alertas = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        res.json(alertas);
    } catch (error) {
        console.error("Error obteniendo alertas:", error);
        res.status(500).json({ error: "Error al obtener las alertas" });
    }
});

// 2. MODIFICAMOS EL LISTEN PARA EJECUTAR LA PRUEBA
app.listen(PORT, async () => {
  console.log(` Servidor escuchando en http://localhost:${PORT}`);
  
  // Llamamos a la función de Firebase para ver si conecta
  console.log("Intentando conectar a Firebase y cargar datos...");
  await cargarDatosPrueba(); 
});