import React, { useReducer, useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import addBook from './addBook';
import reducer from './reducer';
import { Book } from 'Types';

const default_book : Book = {
    titulo: '',
    descripcion: '',
    id: ''
};

export interface EditorProps {
    onAdd: () => void
};

const Editor = ({onAdd} : EditorProps) => {

    const [book, dispatch] = useReducer(reducer,default_book);
    const [editing, setEditing] = useState(false);

    return (
        <>
            <Button 
            fullWidth
            variant="contained"
            color="primary"
            style={styles.button}
            onClick={() => setEditing(true)}>
                Agregar nuevo libro
            </Button>
            <Dialog
            open={editing}
            onClose={() => setEditing(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">
                    Nuevo Libro
                </DialogTitle>
                <DialogContent>
                    <FormControl 
                    fullWidth 
                    style={{marginBottom: 10}}>
                        <TextField 
                            autoFocus
                            label="Titulo"
                            onChange={({target}) => {
                                dispatch({
                                    type: 'setTitulo', 
                                    payload: target.value
                                });
                            }}
                        />
                    </FormControl>
                    <FormControl 
                    fullWidth 
                    style={{marginBottom: 10}}>
                        <TextField 
                            label="Descripción"
                            multiline
                            onChange={({target}) => {
                                dispatch({
                                    type: 'setDescripcion',
                                    payload: target.value
                                });
                            }}
                        />
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button 
                    onClick={() => setEditing(false)} 
                    color="primary">
                        Cancelar
                    </Button>
                    <Button 
                    autoFocus
                    onClick={() => {
                        addBook(book)
                        .then(() => onAdd())
                        .catch(err => console.error(err))
                    }}
                    color="primary">
                        Crear
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
};

const styles = {
    button: {
        marginTop: 20
    }
}

export default Editor;