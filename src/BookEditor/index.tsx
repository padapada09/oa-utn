import React, { useReducer, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Loader from 'components/Loader';
import TextField from '@material-ui/core/TextField';
import styles from './styles.module.scss';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { Content } from 'Types';
import { Contents } from 'Services';
import { useContents } from 'Hooks';
import { dependsOf } from 'Helpers';
import reducer from './reducer';
import reducerNew from './reducerNew';

export interface BookRouteParams { 
    book_id: string
};

const blank_content : Content = {
    id: '',
    titulo: '',
    descripcion: '',
    puntaje_maximo: 0,
    recomended: true,
    dependencias: []
};

const BookEditor = ({match, history, location} : RouteComponentProps<BookRouteParams>) => {

    const [contents_from_db, loading_contents, reloadContents] = useContents(match.params.book_id);
    const [contents, dispatch] = useReducer(reducer,[]);
    const [new_content, dispatchNew] = useReducer(reducerNew,blank_content);

    useEffect(() => {
        dispatch({payload: contents_from_db});
    },[contents_from_db]);

    async function add (content: Content) {
        const response = await Contents.add(content);

        if (response.success) {
            dispatchNew({type: 'clean', payload: ''});
            reloadContents();
        };
    };

    async function edit (content : Content) {
        const response = await Contents.edit(content);
        if (response.success) {
            reloadContents();
        };
    };

    async function remove (content : Content) {
        const response = await Contents.remove(content.id);
        if (response.success) {
            reloadContents();
        }
    };

    if (loading_contents) return <Loader />

    return (
        <Container 
        maxWidth="sm" 
        className={'MobileContainer'} 
        data-testid="container">
            {   contents.map((content,index) => 
                    <Card key={content.id} style={{marginTop: 15}} data-testid="content">
                        <div className={styles.CardHeader}>
                            <TextField 
                                value={content.titulo}
                                fullWidth
                                placeholder="Titulo"
                                onChange={({target}) => dispatch({
                                    id: content.id,
                                    payload: {
                                        ...content,
                                        titulo: target.value
                                    }
                                })}
                            />
                        </div>
                        <CardContent>
                            <TextField 
                                variant="outlined"
                                value={content.descripcion}
                                fullWidth
                                multiline
                                placeholder="Descripción"
                                rowsMax={4}
                                onChange={({target}) => dispatch({
                                    id: content.id,
                                    payload: {
                                        ...content,
                                        descripcion: target.value
                                    }
                                })}
                            />
                            <FormControl 
                            disabled={!Boolean(contents.filter(other_content => other_content.id !== content.id).filter(other_content => !dependsOf(other_content,content,contents)).length)}
                            fullWidth 
                            style={{marginTop: 10}}>
                                <InputLabel id="demo-simple-select-label">Dependencias</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={content.dependencias}
                                    multiple
                                    onChange={({target}) => dispatch({
                                        id: content.id, 
                                        payload: {
                                            ...content,
                                            dependencias: target.value as string[]
                                        }
                                    })}
                                >
                                    {   contents
                                                .filter(other_content => other_content.id !== content.id)
                                                .filter(other_content => !dependsOf(other_content,content,contents))
                                                .map(other_content => (
                                            <MenuItem 
                                            key={other_content.id}
                                            value={other_content.id}>
                                                {other_content.titulo}
                                            </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </CardContent>
                        <CardActions>
                        {   ((content.titulo !== contents_from_db[index].titulo) ||
                            (content.descripcion !== contents_from_db[index].descripcion) ||
                            (content.dependencias !== contents_from_db[index].dependencias)) &&
                                <Button onClick={() => edit(content)}>
                                    Guardar cambios
                                </Button>
                        }
                            <Button onClick={() => remove(content)}>
                                Eliminar
                            </Button>
                        </CardActions>
                    </Card>
                )
            }
            <Card style={{marginTop: 15}} data-testid="content">
                <div className={styles.CardHeader}>
                    <TextField 
                        value={new_content.titulo}
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
                        value={new_content.descripcion}
                        fullWidth
                        multiline
                        placeholder="Descripción"
                        rowsMax={4}
                        onChange={({target}) => dispatchNew({
                            type: 'descripcion',
                            payload: target.value
                        })}
                    />
                    <FormControl fullWidth style={{marginTop: 10}}>
                        <InputLabel id="demo-simple-select-label">Dependencias</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={new_content.dependencias}
                            multiple
                            onChange={({target}) => dispatchNew({type: 'dependencias', payload: target.value as string[]})}
                        >
                            {   contents.map(content => (
                                    <MenuItem 
                                    key={content.id}
                                    value={content.id}>
                                        {content.titulo}
                                    </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </CardContent>
                <CardActions>
                    <Button onClick={() => add(new_content)}>
                        Agregar nuevo libro
                    </Button>
                </CardActions>
            </Card>
            <div style={{height: 300}}/>
        </Container>
    );
}

export default BookEditor;