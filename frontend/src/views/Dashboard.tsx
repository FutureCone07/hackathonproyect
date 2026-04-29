import React from 'react';
import { Container, Row, Col, Card, Table, ProgressBar, Badge, Button } from 'react-bootstrap';

// Definimos cómo luce un Alumno para que TypeScript nos ayude a no cometer errores
interface Alumno {
    id: string;
    riesgo: number;
    sentimiento: string;
    causa: 'Académica' | 'Económica' | 'Personal';
    sugerenciaIA: string;
}

const Dashboard: React.FC = () => {
    // Datos de ejemplo (Luego estos vendrán de Firebase)
    const alumnos: Alumno[] = [
        {
            id: "ST-001",
            riesgo: 85,
            sentimiento: "Frustración Alta",
            causa: "Económica",
            sugerenciaIA: "Activar bono de transporte y beca alimenticia."
        },
        {
            id: "ST-042",
            riesgo: 45,
            sentimiento: "Confusión",
            causa: "Académica",
            sugerenciaIA: "Agendar tutoría de Matemáticas II."
        }
    ];

    return (
        <Container fluid className="p-4" style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
            <Row className="mb-4">
                <Col>
                    <h1 className="fw-bold">Panel de Retención Estudiantil</h1>
                    <p className="text-muted">Análisis en tiempo real potenciado por Gemini</p>
                </Col>
            </Row>

            {/* Tarjetas de Resumen */}
            <Row className="mb-4">
                <Col md={4}>
                    <Card className="shadow-sm border-0 bg-danger text-white">
                        <Card.Body>
                            <h5>Riesgo Crítico</h5>
                            <h2>12 Alumnos</h2>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card className="shadow-sm border-0 bg-success text-white">
                        <Card.Body>
                            <h5>Retribuciones Activas</h5>
                            <h2>24 Apoyos</h2>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card className="shadow-sm border-0 bg-primary text-white">
                        <Card.Body>
                            <h5>Análisis de IA</h5>
                            <h2>98% Precisión</h2>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {/* Tabla Principal */}
            <Card className="shadow-sm border-0">
                <Card.Header className="bg-white py-3">
                    <h5 className="mb-0">Alumnos Prioritarios</h5>
                </Card.Header>
                <Card.Body>
                    <Table hover responsive>
                        <thead>
                            <tr>
                                <th>ID Alumno</th>
                                <th>Probabilidad de Abandono</th>
                                <th>Estado Emocional</th>
                                <th>Causa Raíz</th>
                                <th>Sugerencia de Gemini</th>
                                <th>Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                            {alumnos.map((alumno) => (
                                <tr key={alumno.id} style={{ verticalAlign: 'middle' }}>
                                    <td><strong>{alumno.id}</strong></td>
                                    <td style={{ width: '200px' }}>
                                        <ProgressBar
                                            now={alumno.riesgo}
                                            variant={alumno.riesgo > 70 ? "danger" : "warning"}
                                            label={`${alumno.riesgo}%`}
                                        />
                                    </td>
                                    <td>
                                        <Badge pill bg="light" text="dark" className="border">
                                            {alumno.sentimiento}
                                        </Badge>
                                    </td>
                                    <td>
                                        <Badge bg={alumno.causa === 'Económica' ? 'success' : 'info'}>
                                            {alumno.causa}
                                        </Badge>
                                    </td>
                                    <td className="small italic text-muted">{alumno.sugerenciaIA}</td>
                                    <td>
                                        <Button variant="outline-primary" size="sm">Ver Detalles</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default Dashboard;