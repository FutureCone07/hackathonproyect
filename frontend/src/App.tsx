import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import Dashboard from './views/Dashboard';
import Retribuciones from './views/Retribuciones';

function App() {
    return (
        <Router>
            {/* Barra de Navegación Global */}
            <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
                <Container>
                    <Navbar.Brand as={Link} to="/">AI Retención</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <Nav.Link as={Link} to="/">Dashboard</Nav.Link>
                            <Nav.Link as={Link} to="/retribuciones">Retribuciones</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            {/* Definición de Rutas */}
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/retribuciones" element={<Retribuciones />} />
            </Routes>
        </Router>
    );
}

export default App;