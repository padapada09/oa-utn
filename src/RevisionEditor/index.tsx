import React, { useEffect, useReducer } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { RevisionRouteParams } from 'Revision';
import { useQuestions } from 'Hooks';
import styles from './styles.module.scss';
import reducer from './reducer';
import { 
    Card,
    CardActionArea, 
    CardActions, 
    CardContent, 
    TextField,
    Button, 
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from '@material-ui/core';
import { post } from 'Services';

const RevisionEditor = ({match} : RouteComponentProps<RevisionRouteParams>) => {

    const [questions] = useQuestions(match.params.content_id);
    const [question, dispatch] = useReducer(reducer,{});

    // console.log(question);

    async function saveQuestion() {
        const response = await post("/questions/edit",{question});
        // console.log(response);
    };

    return (
        <div className={styles.Container}>
            <div className={styles.Sidebar}>
                {   questions.map(question => (
                        <Card  
                        key={question.id} 
                        classes={{root: styles.Miniature}}>
                            <CardActionArea 
                                style={{width: '100%', height: '100%'}}
                                onClick={() => dispatch({
                                    type: "selectQuestion", 
                                    payload: question
                                })}
                            />
                        </Card>
                ))}
            </div>
            <div className={styles.MainView}>
                {   (question && question.respuestas) &&
                    <Card classes={{root: styles.MainCard}}>
                        <div className={styles.MainViewHeader}>
                            <TextField 
                                label="Titulo"
                                variant="outlined"
                                value={question.titulo}
                                fullWidth
                                onChange={event => dispatch({
                                    type: "setTitle",
                                    payload: event.target.value as string
                                })}
                            />
                        </div>
                        <div className={styles.MainViewDescription}>
                            <TextField 
                                label="Descripción"
                                variant="outlined"
                                value={question.descripcion}
                                fullWidth
                                multiline
                                rowsMax={7}
                                onChange={event => dispatch({
                                    type: "setDescription",
                                    payload: event.target.value as string
                                })}
                            />
                        </div>
                        <CardContent classes={{root: styles.AnswersContainer}}>
                            {   question.respuestas.map((respuesta,index) => (
                                    <div key={index} className={styles.Answer}>
                                        <FormControl 
                                        variant="outlined"
                                        style={{width: 250, marginRight: 10}}>
                                            <InputLabel 
                                            variant="outlined"
                                            id="demo-simple-select-label">
                                                Valoración
                                            </InputLabel>
                                            <Select
                                            variant="outlined"
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            label="Valoración"
                                            value={respuesta.valoracion}
                                            onChange={event => dispatch({
                                                type: "setAnswer",
                                                index,
                                                payload: {
                                                    ...respuesta, 
                                                    valoracion: event.target.value as number
                                                }
                                            })}>
                                                <MenuItem value={0}>0%</MenuItem>
                                                <MenuItem value={0.25}>25%</MenuItem>
                                                <MenuItem value={0.5}>50%</MenuItem>
                                                <MenuItem value={0.75}>75%</MenuItem>
                                                <MenuItem value={1}>100%</MenuItem>
                                            </Select>
                                        </FormControl>
                                        <TextField 
                                            label="Respuesta"
                                            variant="outlined"
                                            multiline
                                            fullWidth
                                            value={respuesta.descripcion}
                                            style={{marginRight: 10}}
                                            onChange={event => dispatch({
                                                type: "setAnswer",
                                                index,
                                                payload: {
                                                    ...respuesta, 
                                                    descripcion: event.target.value as string
                                                }
                                            })}
                                        />
                                        <TextField 
                                            label="Feedback"
                                            variant="outlined"
                                            value={respuesta.feedback}
                                            multiline
                                            fullWidth
                                            style={{marginRight: 10}}
                                            onChange={event => dispatch({
                                                type: "setAnswer",
                                                index,
                                                payload: {
                                                    ...respuesta, 
                                                    feedback: event.target.value as string
                                                }
                                            })}
                                        />
                                        <Button 
                                        variant="contained"
                                        style={{width: 150}}
                                        onClick={() => dispatch({
                                            type: "removeAnswer", 
                                            index
                                        })}>
                                            Eliminar
                                        </Button>
                                    </div>
                            ))}
                        </CardContent>
                        <CardActions>
                            <Button onClick={saveQuestion}>
                                Guardar
                            </Button>
                            <Button onClick={() => dispatch({type: "addAnswer"})}>
                                Agregar respuesta
                            </Button>
                        </CardActions>
                    </Card>
                }
            </div>
        </div>
    );
};

export default RevisionEditor;