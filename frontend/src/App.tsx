import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AccesoAlumno from './views/AccesoAlumno';
import ChatbotAlumno from './views/ChatbotAlumno';
import Login from './views/Login';
import Dashboard from './views/Dashboard';
import Retribuciones from './views/Retribuciones';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Rutas para el Alumno */}
        <Route path="/" element={<AccesoAlumno />} />
        <Route path="/tutor-ia" element={<ChatbotAlumno />} />

        {/* Rutas para el Maestro/Admin */}
        <Route path="/login-maestro" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/retribuciones" element={<Retribuciones />} />
      </Routes>
    </Router>
  );
}

export default App;