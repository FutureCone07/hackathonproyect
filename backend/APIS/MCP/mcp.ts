import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
    console.error("❌ FALTA LA API KEY en el archivo .env");
    process.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);
// Probemos con este nombre que es el más estándar para la API
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

export async function procesarMensaje(mensaje: string) {
    try {
        console.log("🤖 Procesando mensaje en Gemini:", mensaje);

        if (!mensaje) {
            throw new Error("El mensaje llegó vacío al backend");
        }

        const result = await model.generateContent(mensaje);
        const respuesta = result.response.text();

        console.log("✅ Gemini respondió correctamente");
        return respuesta;

    } catch (error) {
        console.error("🚨 ERROR CRÍTICO EN GEMINI:", error);
        return "Error de conexión con la IA. Revisa la consola.";
    }
}