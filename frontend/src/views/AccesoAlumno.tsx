import React, { useState } from 'react';
import { Container, Card, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const AccesoAlumno = () => {
    const [numControl, setNumControl] = useState('');
    const navigate = useNavigate();

    const handleIngresar = (e: React.FormEvent) => {
        e.preventDefault();
        // Aquí podrías validar que el número tenga el formato del TecNM
        if (numControl.length > 0) {
            // Guardamos el ID en el storage para que el chatbot sepa quién eres
            localStorage.setItem('alumnoID', numControl);
            navigate('/tutor-ia');
        }
    };

    return (
        <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
            <Card className="shadow p-4 text-center" style={{ width: '400px' }}>
                <h3>Bienvenido al Tutor IA</h3>
                <p className="text-muted">Ingresa tu número de control para comenzar</p>
                <Form onSubmit={handleIngresar}>
                    <Form.Control
                        type="text"
                        placeholder="Ej. 211080251"
                        className="mb-3 text-center"
                        onChange={(e) => setNumControl(e.target.value)}
                        required
                    />
                    <Button variant="success" type="submit" className="w-100">
                        Iniciar Sesión
                    </Button>
                </Form>
            </Card>
        </Container>
    );
};

export default AccesoAlumno;