import React, { useState, useMemo } from'react';
import { useHistory, useParams } from 'react-router-dom';
import { Container, Button, Modal } from 'react-bootstrap';
import Component from '../Component';

const Content = ({book}) => {

    const [modal, showModal] = useState(false);
    const history = useHistory();
    const params = useParams();
    const content = useMemo(_ => book.find(content => content.id === params.id));

    function evaluateContent () {
        showModal(true);
    }

    return (
        <Container style={styles.container}>

            {content.componentes.map((component,key) => <Component {...component} {...{key}} />)}

            <Button block style={styles.button} onClick={evaluateContent}>Evaluar</Button>

            <Modal show={modal} onHide={() => showModal(false)}>
                <Modal.Header closeButton>
                <Modal.Title>Estás por ir a una evaluación</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    En la siguiente pantalla evaluaremos tu entendimiento de los contenidos de Derivadas 1.
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={() => showModal(false)}>
                    Cancelar
                </Button>
                <Button variant="primary" onClick={() => history.push(`${history.location.pathname}/evaluation`)}>
                    Ir
                </Button>
                </Modal.Footer>
            </Modal>

        </Container>
    );
}

const styles = {
    container: {
        overflowY: 'scroll'
    },
    img: {
        padding: '10px',
        width: '100%'
    },
    iframe: {
        width: '100%',
        padding: '10px',
        borderStyle: 'hidden'
    },
    button: {
        marginTop: '20px',
        marginBottom: '20px',
    }
}

export default Content;
