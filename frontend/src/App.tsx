import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AccesoAlumno from './views/AccesoAlumno';
import ChatbotAlumno from './views/ChatbotAlumno';
import Dashboard from './views/Dashboard';
import Retribuciones from './views/Retribuciones';

// Importante: No pongas el Navbar aquí si quieres que el Login se vea solo.
function App() {
    return (
        <Router>
            <Routes>
                {/* 1. Ruta inicial: Solo muestra el Login sin Navbar */}
                <Route path="/" element={<AccesoAlumno />} />

                {/* 2. Rutas del Panel: Estas deben cargar sus propios Navbars internamente */}
                <Route path="/acceso-alumno" element={<AccesoAlumno />} />
                <Route path="/tutor-ia" element={<ChatbotAlumno />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/retribuciones" element={<Retribuciones />} />

                {/* 3. Comodín: Si no encuentra la ruta, regresa al login */}
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router>
    );
}

export default App;