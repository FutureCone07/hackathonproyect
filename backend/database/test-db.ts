import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "./firebase.ts"; 

export const cargarDatosPrueba = async () => {
  console.log("Iniciando carga de datos del TecNM Iztapalapa...");

  try {
    const estudiantes = [
      {
        id: "num_control_21250001",
        nombre: "Alejandro Martínez",
        carrera: "Ingeniería en Sistemas Computacionales",
        semestre: 4,
        promedio_general: 8.2,
        materias: {
          "Matemáticas Discretas": { calificacion_parcial: 6.0, asistencia: 65, estado: "En riesgo" },
          "Desarrollo Web (TypeScript/Next.js)": { calificacion_parcial: 9.5, asistencia: 100, estado: "Excelente" },
          "Bases de Datos": { calificacion_parcial: 8.0, asistencia: 90, estado: "Regular" }
        },
        perfil_ia: "Muestra gran facilidad para la programación front-end, pero se le dificulta la lógica matemática y falta a clases tempranas."
      },
      {
        id: "num_control_21250002",
        nombre: "Sofía Ramírez",
        carrera: "Ingeniería Mecatrónica",
        semestre: 6,
        promedio_general: 7.5,
        materias: {
          "Sistemas Embebidos (Arduino)": { calificacion_parcial: 9.0, asistencia: 95, estado: "Excelente" },
          "Cálculo Vectorial": { calificacion_parcial: 5.0, asistencia: 50, estado: "Peligro de Deserción" },
          "Dinámica": { calificacion_parcial: 6.5, asistencia: 70, estado: "En riesgo" }
        },
        perfil_ia: "Excelente armando circuitos y protoboards, pero el Cálculo la está frustrando. Mencionó en foros que trabaja por las tardes y no le da tiempo de estudiar."
      },
      {
        id: "num_control_21250003",
        nombre: "Daniela Castro",
        carrera: "Ingeniería en Gestión Empresarial",
        semestre: 2,
        promedio_general: 9.1,
        materias: {
          "Contabilidad Orientada a Negocios": { calificacion_parcial: 9.0, asistencia: 100, estado: "Excelente" },
          "Fundamentos de Física": { calificacion_parcial: 9.5, asistencia: 95, estado: "Excelente" }
        },
        perfil_ia: "Alumna regular, participativa. Sin riesgo detectado."
      }
    ];

   
    for (const est of estudiantes) {
      const docRef = doc(db, "estudiantes", est.id);
      await setDoc(docRef, est);
    }


    const alertas = [
      {
        id: "alerta_001",
        estudiante_id: "num_control_21250002",
        nombre_alumno: "Sofía Ramírez",
        carrera: "Ingeniería Mecatrónica",
        probabilidad_abandono: 85,
        materia_riesgo: "Cálculo Vectorial",
        nivel_urgencia: "ALTA",
        motivo_ia: "Análisis de Sentimiento: El alumno expresó extrema frustración con las matemáticas. El cruce de datos muestra 50% de inasistencia reciente debido a carga laboral externa.",
        sugerencia_ia: "Programar asesoría urgente de Cálculo. Sugerir esquema de beca de transporte o alimenticia para aliviar presión económica.",
        estado: "Pendiente de revisión",
        fecha: new Date().toISOString()
      },
      {
        id: "alerta_002",
        estudiante_id: "num_control_21250001",
        nombre_alumno: "Alejandro Martínez",
        carrera: "Ingeniería en Sistemas Computacionales",
        probabilidad_abandono: 40,
        materia_riesgo: "Matemáticas Discretas",
        nivel_urgencia: "MEDIA",
        motivo_ia: "Análisis de Sentimiento: Desmotivación focalizada. El alumno dice 'no entender para qué sirve la teoría si él solo quiere programar web'.",
        sugerencia_ia: "Tutoría motivacional: Mostrarle cómo las matemáticas discretas se aplican en la arquitectura de bases de datos y algoritmos de compresión web.",
        estado: "En proceso",
        fecha: new Date().toISOString()
      }
    ];

    for (const alerta of alertas) {
      const docRef = doc(db, "alertas_tempranas", alerta.id);
      await setDoc(docRef, alerta);
      console.log(`Alerta temprana generada para: ${alerta.nombre_alumno}`);
    }

    console.log("¡Todos los datos del TecNM Iztapalapa fueron cargados con éxito!");

  } catch (error) {
    console.error("Error cargando la base de datos:", error);
  }
};