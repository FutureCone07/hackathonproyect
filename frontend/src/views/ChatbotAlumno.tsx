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
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Recuperamos el número de control guardado en el login del alumno
        const savedID = localStorage.getItem('alumnoID');
        if (savedID) setNumControl(savedID);
    }, []);

    useEffect(() => {
        // Scroll automático al último mensaje
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        // 1. Mostramos el mensaje del alumno en la pantalla
        const newMessage: Message = { id: Date.now(), text: input, sender: 'user' };
        setMessages(prev => [...prev, newMessage]);
        setInput('');
        setIsTyping(true);

        try {
            // 2. CONEXIÓN REAL CON EXPRESS (GEMINI)
            const response = await fetch('http://localhost:3000/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    mensaje: newMessage.text,
                    estudiante_id: numControl // Le mandamos quién es para el dashboard
                }),
            });

            const data = await response.json();

            // 3. Mostramos la respuesta de Gemini
            const aiResponse: Message = {
                id: Date.now() + 1,
                text: data.tutor,
                sender: 'ai'
            };
            setMessages(prev => [...prev, aiResponse]);

        } catch (error) {
            console.error("Error al conectar con el servidor:", error);
            const errorMsg: Message = {
                id: Date.now() + 1,
                text: "Uy, parece que perdí la conexión con el servidor. ¿Puedes intentar de nuevo?",
                sender: 'ai'
            };
            setMessages(prev => [...prev, errorMsg]);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <Container className="py-4" style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Card className="shadow flex-grow-1 d-flex flex-column" style={{ overflow: 'hidden' }}>
                <Card.Header className="bg-primary text-white d-flex justify-content-between align-items-center">
                    <h5 className="mb-0">Tutor IA - ITIZ</h5>
                    <small>Control: {numControl || 'Invitado'}</small>
                </Card.Header>

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
                    {isTyping && (
                        <div className="d-flex justify-content-start mb-3">
                            <div className="text-muted small italic">El tutor está escribiendo...</div>
                        </div>
                    )}
                    <div ref={scrollRef} />
                </Card.Body>

                <Card.Footer className="bg-white p-3">
                    <Form onSubmit={handleSendMessage}>
                        <InputGroup>
                            <Form.Control
                                placeholder="Escribe tu duda aquí..."
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                disabled={isTyping}
                            />
                            <Button variant="primary" type="submit" disabled={isTyping || !input.trim()}>
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