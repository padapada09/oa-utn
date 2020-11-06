import React, { useEffect, useReducer } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { RevisionRouteParams } from 'Revision';
import { Question } from 'Types';
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
    MenuItem, Typography
} from '@material-ui/core';
import { post } from 'Services';

const RevisionEditor = ({match: {params: {content_id}}} : RouteComponentProps<RevisionRouteParams>) => {
    const [questions, reloadQuestions] = useQuestions(content_id);
    const [selected_question, dispatch] = useReducer(reducer,undefined);

    async function addQuestion() {
        const response = await post<Question>("/questions/add",{content_id});
        if (response.success) {
            reloadQuestions();
        } else {
            console.error("Tuvimos un problema al agregar una nueva preugnta",response.error);
        }
    };

    async function saveQuestion(question: Question) {
        const response = await post("/questions/edit",{question});
        if (response.success) {
            reloadQuestions();
        } else {
            alert(`Parece que tuvimos un problema. ${JSON.stringify(response.error)}`)
        }
    };

    async function removeQuestion(question: Question) {
        const response = await post("/questions/delete",{id: question.id});
        if (response.success) {
            reloadQuestions();
            dispatch({type: "selectQuestion", payload: undefined});
        }
    };

    return (
        <div className={styles.Container}>
            <div className={styles.Sidebar}>
                {   questions.map(question => (
                        <Card  
                        key={question.id} 
                        classes={{root: `${styles.Miniature} ${question.id === selected_question?.id ? styles.Selected : ''}`}}>
                            <CardActionArea 
                                classes={{root: `${styles.MiniatureContent}`}}
                                onClick={() => dispatch({
                                    type: "selectQuestion", 
                                    payload: question
                                })}
                            >
                                <Typography style={{margin: 5}}>
                                    {question.titulo}
                                </Typography>
                                <div className={styles.MiniatureBody}>
                                    {question.dificultad}
                                </div>
                            </CardActionArea>
                        </Card>
                ))}
                <Card  
                classes={{root: styles.Miniature}}>
                    <CardActionArea 
                    onClick={addQuestion}
                    classes={{root: styles.MiniatureContent}}>
                        <div className={styles.MiniatureBody}>
                            ➕
                        </div>
                    </CardActionArea>
                </Card>
            </div>
            <div className={styles.MainView}>
                {   selected_question &&
                    <Card classes={{root: styles.MainCard}}>
                        <div className={styles.MainViewHeader}>
                            <TextField 
                                label="Titulo"
                                variant="outlined"
                                value={selected_question.titulo}
                                fullWidth
                                style={{flex: 5, marginRight: 10}}
                                onChange={event => dispatch({
                                    type: "setTitle",
                                    payload: event.target.value as string
                                })}
                            />
                            <TextField 
                                label="Dificultad"
                                variant="outlined"
                                value={selected_question.dificultad || ''}
                                fullWidth
                                style={{flex: 1}}
                                onChange={event => dispatch({
                                    type: "setDificulty",
                                    payload: event.target.value as string
                                })}
                            />
                        </div>
                        <div className={styles.MainViewDescription}>
                            <TextField 
                                label="Descripción"
                                variant="outlined"
                                value={selected_question.descripcion}
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
                            {   selected_question.respuestas?.map((respuesta,index) => (
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
                            <Button 
                            disabled={JSON.stringify(questions.find(({id}) => id === selected_question.id)) === JSON.stringify(selected_question)}
                            onClick={() => saveQuestion(selected_question)}>
                                Guardar
                            </Button>
                            <Button onClick={() => dispatch({type: "addAnswer"})}>
                                Agregar respuesta
                            </Button>
                            <Button 
                            onClick={() => removeQuestion(selected_question)}>
                                Eliminar
                            </Button>
                        </CardActions>
                    </Card>
                }
            </div>
        </div>
    );
};

export default RevisionEditor;