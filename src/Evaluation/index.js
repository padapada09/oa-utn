import React, { useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import { useParams, useHistory } from 'react-router-dom';
import { PieChart } from 'react-minimal-pie-chart';
//import classes from './styles.module.scss';
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
            
            <div style={styles.evaluation_bar}>
                <div style={{...styles.evaluation_bar_filler, width: `${evaluation.done*100}%`}} />
            </div>

            {   evaluation.done === 1 &&
                <div style={{display: 'flex', flexDirection: 'column', height: '100%'}}>
                    <div style={{display: 'flex', flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                        <PieChart
                            paddingAngle={1}
                            data={[
                                { title: 'Rights', value: evaluation.answers.reduce((total,value) => total + value,0)/evaluation.problems.length, color: '#00cc00' },
                                { title: 'Wrong', value: 1 - (evaluation.answers.reduce((total,value) => total + value,0)/evaluation.problems.length), color: 'red' }
                            ]}
                            radius={30}
                            animate
                            viewBoxSize={[100,100]}
                        >
                            <circle 
                                cx="50" 
                                cy="50" 
                                r="25"
                                strokeWidth="0" 
                                fill="white"
                            />
                            <text
                            x="50"
                            y="50"
                            textAnchor="middle"
                            alignmentBaseline="middle">
                                {`${Math.floor((evaluation.answers.reduce((total,value) => total + value,0)/evaluation.problems.length)*100)}%`}
                            </text>
                        </PieChart>
                    </div>
                    <Button 
                    block 
                    onClick={_ => history.go(-2)}
                    style={styles.button}>
                        Volver
                    </Button>
                </div>
            }

            { evaluation.done < 1 && <h4>{evaluation.problem.pregunta}</h4> }

            { evaluation.done < 1 && evaluation.problem.img && <img alt={evaluation.problem.img_alt} style={styles.imagen} src={evaluation.problem.img} /> }

            {
                evaluation.done < 1 &&
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
            }

            { evaluation.error && <h4 style={styles.error}>{evaluation.error}</h4>}

            { evaluation.done < 1 && <Button block style={styles.button} onClick={submit}>Revisar</Button> }
                

        </Container>
    );
}

const styles = {
    container: {
        position: 'relative',
        paddingTop: '15px',
        paddingBottom: '15px',
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'scroll',
        marginBottom: '50px'
    },
    options: {
        width: '100%',
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
    button: {
        position: 'fixed',
        bottom: 20,
        left: 0,
        width: '90%',
        marginLeft: "5%",
    },
    imagen: {
        width: '100%'
    },
    error: {
        width: '100%',
        textAlign: 'center',
        fontSize: 20,
        color: 'red'
    },
    evaluation_bar: {
        height: 20,
        width: '100%', 
        backgroundColor: 'black', 
        position: 'relative', 
        marginBottom: 10,
        overflow: 'hidden',
        borderRadius: 10
    },
    evaluation_bar_filler: {
        position: 'absolute', 
        top: 0, 
        left: 0, 
        height: `100%`, 
        backgroundColor: '#00cc00',
        transition: 'all 1s'
    }
}

export default Evaluation;