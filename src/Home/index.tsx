import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import useBooks from './useBooks';
import Loader from 'components/Loader';

const Home = () => {

    const [books, loading_books, reloadBooks] = useBooks();
    const history = useHistory();
    const [new_book_dialog, setNewBookDialog] = useState<boolean>(false);
    const [new_book_title, setNewBookTitle] = useState<string>('');
    const [new_book_description, setNewBookDescription] = useState<string>('');

    async function addBook(){        
        fetch(`${process.env.REACT_APP_SERVER_URL}/books/add`,{
            method: 'POST',
            body: JSON.stringify({
                new_book_title,
                new_book_description
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
                setNewBookTitle('');
                setNewBookDescription('');
                setNewBookDialog(false);
                reloadBooks();
            } else {
                console.error(res.error);
            }
        })
        .catch(err => {
            console.error(err)
        });
    }

    if (loading_books) return <Loader />

    return (
        <div>
            {   books.map(book => 
                    <Card key={book.id} style={{marginTop: 15}}>
                        <CardActionArea onClick={() => history.push(book.id)}>
                            <CardHeader
                                title={book.titulo}
                            />
                            <CardContent>
                                <Typography color="textSecondary" gutterBottom>
                                    {book.descripcion}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                )
            }
            <div style={{height: 15}}/>
            { process.env.REACT_APP_MODE === 'editor' &&
                <Button 
                fullWidth
                variant="contained"
                color="primary"
                style={{marginBottom: 20}}
                onClick={() => setNewBookDialog(true)}>
                    Agregar nuevo libro
                </Button>
            }
            <Dialog
            open={new_book_dialog}
            onClose={() => setNewBookDialog(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">
                    Nuevo Libro
                </DialogTitle>
                <DialogContent>
                    <FormControl fullWidth style={{marginBottom: 10}}>
                        <TextField 
                            autoFocus
                            label="Titulo"
                            onChange={({target}) => setNewBookTitle(target.value)}
                        />
                    </FormControl>
                    <FormControl fullWidth style={{marginBottom: 10}}>
                        <TextField 
                            label="Descripción"
                            multiline
                            onChange={({target}) => setNewBookDescription(target.value)}
                        />
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setNewBookDialog(false)} color="primary">
                        Cancelar
                    </Button>
                    <Button onClick={addBook} color="primary" autoFocus>
                        Crear
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default Home;