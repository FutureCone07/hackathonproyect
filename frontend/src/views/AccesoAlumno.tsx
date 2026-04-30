import React, { useState } from 'react';
import { Container, Card, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const AccesoAlumno = () => {
    const [numControl, setNumControl] = useState('');
    const navigate = useNavigate();

    const handleIngresar = (e: React.FormEvent) => {
        e.preventDefault();
        if (numControl.length > 0) {
            localStorage.setItem('alumnoID', numControl);
            navigate('/tutor-ia');
        }
    };

    return (
        <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
            <Card className="shadow p-4 text-center" style={{ width: '400px', borderRadius: '15px', border: 'none' }}>
                <div className="mb-4">
                    <h3 className="fw-bold" style={{ color: '#1e3a8a' }}>Tutor IA</h3>
                    <p className="text-muted">TecNM Campus Iztapalapa</p>
                </div>

                <p className="small mb-3">Ingresa tu número de control para comenzar</p>
                
                <Form onSubmit={handleIngresar}>
                    <Form.Control
                        type="text"
                        placeholder="Ej. 211080251"
                        className="mb-3 text-center py-2"
                        style={{ borderRadius: '10px' }}
                        onChange={(e) => setNumControl(e.target.value)}
                        required
                    />
                    <Button variant="success" type="submit" className="w-100 py-2 fw-bold" style={{ borderRadius: '10px', backgroundColor: '#10b981', border: 'none' }}>
                        Iniciar Sesión
                    </Button>
                </Form>

                {/* --- SECCIÓN PARA DOCENTES --- */}
                <div className="mt-4 pt-3 border-top">
                    <p className="text-muted small mb-1">¿Eres personal académico o administrativo?</p>
                    <Button 
                        variant="link" 
                        size="sm" 
                        onClick={() => navigate('/login-maestro')}
                        className="text-decoration-none fw-bold"
                        style={{ color: '#1e3a8a' }}
                    >
                        Acceso Docente →
                    </Button>
                </div>
            </Card>
        </Container>
    );
};

export default AccesoAlumno;