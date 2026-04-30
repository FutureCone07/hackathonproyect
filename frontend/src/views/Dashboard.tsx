import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, ProgressBar, Badge, Button } from 'react-bootstrap';

interface Alumno {
    id: string;
    riesgo: number;
    sentimiento: string;
    causa: string;
    sugerenciaIA: string;
}

const Dashboard: React.FC = () => {
    // Estado para guardar los datos reales de Firebase
    const [alumnos, setAlumnos] = useState<Alumno[]>([]);
    const [cargando, setCargando] = useState(true);

    const fetchAlertas = async () => {
        try {
            setCargando(true);
            const response = await fetch('http://localhost:3000/api/alertas');
            const data = await response.json();
            
            // Mapeamos los datos de Firebase al formato de la tabla
            const alertasReales = data.map((doc: any) => ({
                id: doc.nombre_alumno || doc.estudiante_id,
                riesgo: doc.probabilidad_abandono,
                sentimiento: doc.nivel_urgencia || 'Urgente',
                causa: doc.materia_riesgo || 'General',
                sugerenciaIA: doc.sugerencia_ia
            }));
            
            setAlumnos(alertasReales);
        } catch (error) {
            console.error("Error cargando las alertas:", error);
        } finally {
            setCargando(false);
        }
    };

    // Cargar datos al iniciar el componente
    useEffect(() => {
        fetchAlertas();
    }, []);

    return (
        <Container fluid className="p-4" style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
            <Row className="mb-4 align-items-center">
                <Col>
                    <h1 className="fw-bold">Panel de Retención Estudiantil</h1>
                    <p className="text-muted">Análisis en tiempo real potenciado por Gemini</p>
                </Col>
                <Col xs="auto">
                    <Button variant="outline-primary" onClick={fetchAlertas}>
                        ↻ Actualizar Datos
                    </Button>
                </Col>
            </Row>

            <Row className="mb-4">
                <Col md={4}>
                    <Card className="shadow-sm border-0 bg-danger text-white">
                        <Card.Body>
                            <h5>Riesgo Crítico</h5>
                            <h2>{alumnos.filter(a => a.riesgo >= 80).length} Alumnos</h2>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card className="shadow-sm border-0 bg-success text-white">
                        <Card.Body>
                            <h5>Alertas Totales</h5>
                            <h2>{alumnos.length} Registros</h2>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card className="shadow-sm border-0 bg-primary text-white">
                        <Card.Body>
                            <h5>Análisis de IA</h5>
                            <h2>Activo y Escuchando</h2>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Card className="shadow-sm border-0">
                <Card.Header className="bg-white py-3">
                    <h5 className="mb-0">Alumnos Prioritarios</h5>
                </Card.Header>
                <Card.Body>
                    {cargando ? (
                        <p className="text-center text-muted py-4">Conectando con Firebase...</p>
                    ) : (
                        <Table hover responsive>
                            <thead>
                                <tr>
                                    <th>Alumno</th>
                                    <th>Probabilidad de Abandono</th>
                                    <th>Nivel Urgencia</th>
                                    <th>Foco de Riesgo</th>
                                    <th>Sugerencia de Gemini</th>
                                    <th>Acción</th>
                                </tr>
                            </thead>
                            <tbody>
                                {alumnos.length === 0 ? (
                                    <tr><td colSpan={6} className="text-center text-muted">No hay alertas registradas</td></tr>
                                ) : (
                                    alumnos.map((alumno, index) => (
                                        <tr key={index} style={{ verticalAlign: 'middle' }}>
                                            <td><strong>{alumno.id}</strong></td>
                                            <td style={{ width: '200px' }}>
                                                <ProgressBar
                                                    now={alumno.riesgo}
                                                    variant={alumno.riesgo > 70 ? "danger" : "warning"}
                                                    label={`${alumno.riesgo}%`}
                                                />
                                            </td>
                                            <td>
                                                <Badge bg={alumno.sentimiento === 'ALTA' ? 'danger' : 'warning'}>
                                                    {alumno.sentimiento}
                                                </Badge>
                                            </td>
                                            <td>
                                                <Badge bg="info" text="dark">
                                                    {alumno.causa}
                                                </Badge>
                                            </td>
                                            <td className="small text-muted" style={{ maxWidth: '300px', whiteSpace: 'normal' }}>
                                                {alumno.sugerenciaIA}
                                            </td>
                                            <td>
                                                <Button variant="outline-primary" size="sm">Atender</Button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </Table>
                    )}
                </Card.Body>
            </Card>
        </Container>
    );
};

export default Dashboard;