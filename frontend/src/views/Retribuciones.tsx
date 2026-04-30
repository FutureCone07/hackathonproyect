import React from 'react';
import { Container, Row, Col, Card, Button, ListGroup, Badge } from 'react-bootstrap';

const Retribuciones: React.FC = () => {
  // Simulación de apoyos que la IA sugirió activar
  const apoyosPendientes = [
    { id: 1, tipo: "Transporte", alumno: "ST-001", razon: "Detección de gasto excesivo en traslados", monto: "$500 MXN" },
    { id: 2, tipo: "Alimentación", alumno: "ST-088", razon: "Baja energía detectada en foros", monto: "$800 MXN" }
  ];

  return (
    <Container className="py-5">
      <h2 className="mb-4">Centro de Retribuciones y Apoyos</h2>
      <Row>
        {/* Panel de Control de Presupuesto */}
        <Col md={4} className="mb-4">
          <Card className="text-white bg-dark shadow border-0">
            <Card.Body>
              <Card.Title>Fondo de Emergencia</Card.Title>
              <h3 className="display-6">$15,400.00</h3>
              <p className="small">Sincronizado con Blockchain</p>
              <Button variant="outline-light" size="sm">Ver Transacciones</Button>
            </Card.Body>
          </Card>
        </Col>

        {/* Lista de Acciones Sugeridas por la IA */}
        <Col md={8}>
          <Card className="shadow-sm border-0">
            <Card.Header className="bg-white">
              <h5 className="mb-0">Sugerencias de Intervención (Gemini)</h5>
            </Card.Header>
            <ListGroup variant="flush">
              {apoyosPendientes.map((apoyo) => (
                <ListGroup.Item key={apoyo.id} className="p-3">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <Badge bg="info" className="mb-2">{apoyo.tipo}</Badge>
                      <h6>Alumno: {apoyo.alumno}</h6>
                      <p className="text-muted small mb-0">{apoyo.razon}</p>
                    </div>
                    <div className="text-end">
                      <h5 className="text-success">{apoyo.monto}</h5>
                      <Button variant="primary" size="sm">Autorizar y Firmar</Button>
                    </div>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Retribuciones;