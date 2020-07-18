import React, { useState } from 'react';
import { Container, Form, Button, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import { useParams, useHistory } from 'react-router-dom';
import classes from './styles.module.scss';
import useEvaluation from './useEvaluation';
import LoadingScreen from '../LoadingScreen';   

const Evaluation = ({book}) => {

    const [answer, setAnswer] = useState(null);
    const params = useParams();
    const history = useHistory();
    const evaluation = useEvaluation(params.id, book);

    function submit() {
        evaluation.checkAnswer(evaluation.problem.id, answer);
        setAnswer();
    }

    if (evaluation.loading) return <LoadingScreen />;

    return (
        <Container style={styles.container}>
            
            <div style={{height: 20, width: '100%', backgroundColor: 'black', position: 'relative', marginBottom: 10}}>
                <div style={{position: 'absolute', top: 0, left: 0, height: `100%`, width: `${evaluation.done*100}%`, backgroundColor: 'green'}} />
            </div>

            {   evaluation.done === 1 &&
                <>
                    <h2>Errores: {evaluation.wrong_answers}</h2>
                    <button onClick={_ => history.go(-2)}>Volver</button>
                </>
            }

            { evaluation.done < 1 && <h4>{evaluation.problem.pregunta}</h4> }

            { evaluation.done < 1 && evaluation.problem.img && <img style={styles.imagen} src={evaluation.problem.img} /> }

            <div role="listbox" style={styles.options}>
                {   evaluation.done < 1 &&
                    evaluation.problem.opciones.map(({valor},index) =>
                        <Button
                            key={index}
                            role="option"
                            variant={valor === answer ? 'primary' : 'outline-primary'}
                            aria-checked={answer === valor} 
                            style={{...styles.option, ...(answer === valor ? styles.selected : {})}}
                            onClick={() => setAnswer(valor)}
                        >
                            {valor}
                        </Button>
                    )
                }
            </div>

            { evaluation.error && <h4 style={styles.error}>{evaluation.error}</h4>}

            { evaluation.done < 1 && <Button disabled={!answer} block style={{height: '50px'}} onClick={submit}>Revisar</Button> }
                

        </Container>
    );
}

const styles = {
    container: {
        position: 'relative',
        paddingTop: '15px',
        paddingBottom: '15px',
        height: window.innerHeight,
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'scroll'
    },
    options: {
        width: '100%',
        // overflowX: 'hidden',
        // overflowY: 'scroll',
        marginTop: '15px',
        border: 'none',
        flex: 1,
        flexWrap: 'nowrap',
        display: 'flex',
        justifyContent: 'center',
        margin: 0,
        paddingBottom: '40px',
        flexDirection: 'column'
    },
    option: {
        position: 'relative',
        margin: '5px',
        borderRadius: '.25rem',
        textAlign: 'left'
    },
    selected: {
    },
    imagen: {
        width: '100%'
    },
    error: {
        width: '100%',
        textAlign: 'center',
        fontSize: 20,
        color: 'red'
    }
}

export default Evaluation;