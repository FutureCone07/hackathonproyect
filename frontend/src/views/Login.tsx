import React, { useState } from 'react';
import { Container, Card, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Validación para tu demo del Hackathon
        if (email === 'admin@tecnm.mx' && password === 'admin123') {
            navigate('/dashboard');
        } else {
            alert('Credenciales incorrectas. Intenta con admin@tecnm.mx / admin123');
        }
    };

    return (
        <div style={{ backgroundColor: '#f4f7f6', minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
            <Container>
                <div className="d-flex justify-content-center">
                    <Card style={{ width: '100%', maxWidth: '400px' }} className="shadow-lg border-0">
                        <Card.Body className="p-5">
                            <h2 className="text-center mb-4" style={{ fontWeight: 'bold', color: '#2c3e50' }}>
                                Acceso Tutor
                            </h2>
                            <p className="text-muted text-center mb-4">
                                TecNM Iztapalapa I - Retención Estudiantil
                            </p>
                            <Form onSubmit={handleLogin}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Correo Institucional</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="usuario@tecnm.mx"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Contraseña</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </Form.Group>
                                <Button variant="primary" type="submit" className="w-100 py-2 mt-3" style={{ backgroundColor: '#007bff' }}>
                                    Entrar al Panel
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </div>
            </Container>
        </div>
    );
};

export default Login;