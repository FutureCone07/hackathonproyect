import React, { useState, useEffect, useRef } from 'react';
import { Container, Form, Button, InputGroup, Card } from 'react-bootstrap';

interface Message {
    id: number;
    text: string;
    sender: 'user' | 'ai';
}

const ChatbotAlumno = () => {
    const [messages, setMessages] = useState<Message[]>([
        { id: 1, text: "¡Hola! Soy tu Tutor IA. ¿En qué puedo ayudarte hoy con tus materias?", sender: 'ai' }
    ]);
    const [input, setInput] = useState('');
    const [numControl, setNumControl] = useState('');
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Recuperamos el número de control guardado en el paso anterior
        const savedID = localStorage.getItem('alumnoID');
        if (savedID) setNumControl(savedID);
    }, []);

    useEffect(() => {
        // Scroll automático al último mensaje
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        const newMessage: Message = { id: Date.now(), text: input, sender: 'user' };
        setMessages([...messages, newMessage]);
        setInput('');

        // SIMULACIÓN: Aquí es donde enviarías el texto al Backend (Puerto 3000)
        // El backend procesa con Gemini y devuelve la respuesta.
        setTimeout(() => {
            const aiResponse: Message = {
                id: Date.now() + 1,
                text: "Entiendo. Estoy analizando tu situación académica y tus dudas para apoyarte.",
                sender: 'ai'
            };
            setMessages(prev => [...prev, aiResponse]);
        }, 1000);
    };

    return (
        <Container className="py-4" style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Card className="shadow flex-grow-1 d-flex flex-column" style={{ overflow: 'hidden' }}>
                {/* Encabezado con info del alumno */}
                <Card.Header className="bg-primary text-white d-flex justify-content-between align-items-center">
                    <h5 className="mb-0">Tutor IA - ITIZ</h5>
                    <small>Control: {numControl}</small>
                </Card.Header>

                {/* Cuerpo del Chat */}
                <Card.Body className="flex-grow-1" style={{ overflowY: 'auto', backgroundColor: '#f8f9fa' }}>
                    {messages.map((msg) => (
                        <div key={msg.id} className={`d-flex ${msg.sender === 'user' ? 'justify-content-end' : 'justify-content-start'} mb-3`}>
                            <div style={{
                                maxWidth: '75%',
                                padding: '10px 15px',
                                borderRadius: '15px',
                                backgroundColor: msg.sender === 'user' ? '#007bff' : '#e9ecef',
                                color: msg.sender === 'user' ? 'white' : 'black',
                                boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
                            }}>
                                {msg.text}
                            </div>
                        </div>
                    ))}
                    <div ref={scrollRef} />
                </Card.Body>

                {/* Entrada de texto */}
                <Card.Footer className="bg-white p-3">
                    <Form onSubmit={handleSendMessage}>
                        <InputGroup>
                            <Form.Control
                                placeholder="Escribe tu duda aquí..."
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                            />
                            <Button variant="primary" type="submit">
                                Enviar
                            </Button>
                        </InputGroup>
                    </Form>
                </Card.Footer>
            </Card>
        </Container>
    );
};

export default ChatbotAlumno;