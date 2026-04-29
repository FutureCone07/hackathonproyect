import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { procesarMensaje } from "./backend/APIS/MCP/mcp.js"; 

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json()); 
app.use(express.static(path.join(__dirname, "frontend", "public")));

app.get("/", (_req: any, res: any) => {
  res.sendFile(path.join(__dirname, "frontend", "public", "main.html"));
});


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

app.listen(PORT, () => {
  console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`);
});