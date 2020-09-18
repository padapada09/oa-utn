import React, { useReducer, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Loader from 'components/Loader';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import styles from './styles.module.scss';
import { Book } from 'Types';
import { Books } from 'Services';
import { useBooks } from 'Hooks';
import reducer from './reducer';
import reducerNew from './reducerNew';

const HomeEditor = () => {

    const [books_from_db, loading_books, reloadBooks] = useBooks();
    const [books, dispatch] = useReducer(reducer,[]);
    const [new_book, dispatchNew] = useReducer(reducerNew,{titulo: '', descripcion: '', id: ''} as Book);

    useEffect(() => {
        dispatch({payload: books_from_db});
    },[books_from_db]);

    async function add (book: Book) {
        const response = await Books.add(book);

        if (response.success) {
            dispatchNew({type: 'clean', payload: ''});
            reloadBooks();
        };
    };

    async function edit (book : Book) {
        const response = await Books.edit(book);
        if (response.success) {
            reloadBooks();
        };
    };

    async function remove (book : Book) {
        const response = await Books.remove(book.id);
        if (response.success) {
            reloadBooks();
        }
    };

    if (loading_books) return <Loader />

    return (
        <Container 
        maxWidth="sm" 
        className={'MobileContainer'} 
        data-testid="container">
            {   books.map((book,index) => 
                    <Card key={book.id} style={{marginTop: 15}} data-testid="book">
                        <div className={styles.CardHeader}>
                            <TextField 
                                value={book.titulo}
                                fullWidth
                                placeholder="Titulo"
                                onChange={({target}) => dispatch({
                                    id: book.id,
                                    payload: {
                                        id: book.id,
                                        titulo: target.value,
                                        descripcion: book.descripcion
                                    }
                                })}
                            />
                        </div>
                        <CardContent>
                            <TextField 
                                variant="outlined"
                                value={book.descripcion}
                                fullWidth
                                multiline
                                placeholder="Descripción"
                                rowsMax={4}
                                onChange={({target}) => dispatch({
                                    id: book.id,
                                    payload: {
                                        id: book.id,
                                        titulo: book.titulo,
                                        descripcion: target.value
                                    }
                                })}
                            />
                        </CardContent>
                        <CardActions>
                        {   ((book.titulo !== books_from_db[index].titulo) ||
                            (book.descripcion !== books_from_db[index].descripcion)) &&
                                <Button onClick={() => edit(book)}>
                                    Guardar cambios
                                </Button>
                        }
                            <Button onClick={() => remove(book)}>
                                Eliminar
                            </Button>
                        </CardActions>
                    </Card>
                )
            }
            <Card style={{marginTop: 15}} data-testid="book">
                <div className={styles.CardHeader}>
                    <TextField 
                        value={new_book.titulo}
                        fullWidth
                        placeholder="Titulo"
                        onChange={({target}) => dispatchNew({
                            type: 'titulo',
                            payload: target.value
                        })}
                    />
                </div>
                <CardContent>
                    <TextField 
                        variant="outlined"
                        value={new_book.descripcion}
                        fullWidth
                        multiline
                        placeholder="Descripción"
                        rowsMax={4}
                        onChange={({target}) => dispatchNew({
                            type: 'descripcion',
                            payload: target.value
                        })}
                    />
                </CardContent>
                <CardActions>
                    <Button onClick={() => add(new_book)}>
                        Agregar nuevo libro
                    </Button>
                </CardActions>
            </Card>
        </Container>
    );
}

export default HomeEditor;