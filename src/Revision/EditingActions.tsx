import React, { useState } from 'react';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import { InputLabel } from '@material-ui/core';

interface EditingActionsProps {
    content_id: string
}

const EditingActions = ({content_id}: EditingActionsProps) => {

    const [new_question_dialog, setNewQuestionDialog] = useState<boolean>(false);
    const [new_question_title, setNewQuestionTitle] = useState<string>('');
    const [new_question_description, setNewQuestionDescription] = useState<string>('');
    const [new_question_wrong_answers, setNewQuestionWrongAnswers] = useState<string[]>([]);
    const [new_question_answer, setNewQuestionAnswer] = useState<string>('');
    const [new_question_dificulty, setNewQuestionDificulty] = useState<string>('');
    const [new_wrong_answer, setNewWrongAnswer] = useState<string>('');

    async function addQuestion() {
        fetch(`${process.env.REACT_APP_SERVER_URL}/addQuestion`,{
            method: 'POST',
            body: JSON.stringify({
                new_question_title,
                new_question_description,
                new_question_wrong_answers,
                new_question_answer,
                new_question_dificulty,
                content_id
            }),
            headers:{
                'Content-Type': 'application/json',
                'Content': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
            }
        })
        .then(res => res.json())
        .then(res => {
            if (res.succes) {
                setNewQuestionTitle('');
                setNewQuestionDescription('');
                setNewQuestionWrongAnswers([]);
                setNewQuestionAnswer('');
                setNewQuestionDificulty('');
                setNewQuestionDialog(false);
            } else {
                console.error(res.error);
            }
        })
        .catch(err => {
            console.error(err)
        });
    }

    return (
        <>
            <Fab 
            onClick={() => setNewQuestionDialog(true)}
            color="primary"
            aria-label="add"
            style={{
                position: 'fixed', 
                bottom: '20vw', 
                right: '5vw',
                zIndex: 10
            }}>
                <AddIcon/>
            </Fab>
            <Dialog
            open={new_question_dialog}
            onClose={() => setNewQuestionDialog(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">
                    Nueva pregunta
                </DialogTitle>
                <DialogContent>
                    <FormControl fullWidth style={{marginBottom: 10}}>
                        <TextField 
                            autoFocus
                            label="Pregunta"
                            multiline
                            onChange={({target}) => setNewQuestionTitle(target.value)}
                        />
                    </FormControl>
                    <FormControl fullWidth style={{marginBottom: 10}}>
                        <TextField 
                            label="Descripción"
                            multiline
                            rows={4}
                            onChange={({target}) => setNewQuestionDescription(target.value)}
                        />
                    </FormControl>
                    <FormControl fullWidth style={{marginBottom: 10}}>
                        <InputLabel>
                            Respuesta correcta
                        </InputLabel>
                        <Input
                            multiline
                            rowsMax={5}
                            value={new_question_answer}
                            onChange={({target}) => setNewQuestionAnswer(target.value)}
                        />
                    </FormControl>
                    {   new_question_wrong_answers.map((wrong_answer,index) =>
                            <FormControl key={wrong_answer} fullWidth>
                                <Input 
                                    value={wrong_answer}
                                    disabled
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton onClick={() => {
                                                setNewQuestionWrongAnswers(prev => {
                                                    const new_arr = [...prev];
                                                    new_arr.splice(index,1);
                                                    return new_arr;
                                                });
                                            }}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>
                    )}
                    <FormControl fullWidth style={{marginBottom: 10}}>
                        <InputLabel>
                            Respuesta incorrecta
                        </InputLabel>
                        <Input
                            multiline
                            rowsMax={5}
                            value={new_wrong_answer}
                            onChange={({target}) => setNewWrongAnswer(target.value)}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton disabled={!new_wrong_answer} onClick={() => {
                                        setNewQuestionWrongAnswers(prev => [...prev, new_wrong_answer]);
                                        setNewWrongAnswer('');
                                    }}>
                                        <AddIcon/>
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                    <FormControl fullWidth style={{marginBottom: 10}}>
                        <TextField 
                            label="Dificultad"
                            onChange={({target}) => setNewQuestionDificulty(target.value)}
                        />
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setNewQuestionDialog(false)} color="primary">
                        Cancelar
                    </Button>
                    <Button onClick={addQuestion} color="primary">
                        Crear
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default EditingActions;