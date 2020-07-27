import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Container, Card, Button } from 'react-bootstrap';
import useBooks from './useBooks';
import LoadingScreen from '../LoadingScreen';
import JSZip from 'jszip';
import addImageToBlocks from './addImageToBlocks';
import README from '../README.json';

const Home = ({setBook}) => {

    const history = useHistory();
    const books = useBooks();
    
    return (
        <Container style={{display: 'flex', flexDirection: 'column', height: '100vh'}}>
            <h1 style={{textAlign: 'center', marginBottom: '5vh', marginTop: '5vh'}}>Bienvenido!</h1>
            <p style={{textAlign: 'center', marginBottom: '5vh', marginTop: '5vh'}}>
                Este es un proyecto en desarrollo activo, llevado adelante por el alumno Francisco Giancarelli de la
                Facultad Regional Santa Fe de la Universidad Tecnologica Nacional, 
                bajo la guía de las Ingenieras Milagros Gutierrez y Valeria Bertossi.
            </p>
            <Container style={{flex: 1, padding: '20px', overflow: 'scroll', marginTop: '20px'}}>
                <Card style={{ width: '100%', marginTop: '20px' }}>
                    <Button variant="outline-primary" onClick={() => undefined}>
                        <Card.Body style={{textAlign: 'left'}}>
                            <Card.Title>Documentación</Card.Title>
                            <Card.Text>Ejemplo de .book con la documentación del proyecto y el formato. Presioná esta tarjeta si querés visualizarlo</Card.Text>
                        </Card.Body>
                    </Button>
                </Card>
            </Container>
        </Container>
    )
}

export default Home;