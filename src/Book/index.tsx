import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import useContents from './useContents';
import styles from './styles.module.scss';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Estrella from './Estrella';
import Loader from 'components/Loader';

interface BookRouteParams { 
    book_id: string
};

const Book = ({match, history, location} : RouteComponentProps<BookRouteParams>) => {

    const [contents, loading_contents, reloadContents] = useContents(match.params.book_id);
    const [new_content_dialog, setNewContentDialog] = useState<boolean>(false);
    const [new_content_title, setNewContentTitle] = useState<string>('');
    const [new_content_description, setNewContentDescription] = useState<string>('');
    const [new_content_dependencies, setNewContentDependencies] = useState<string[]>([]);

    async function addContent(){        
        fetch(`${process.env.REACT_APP_SERVER_URL}/contents/add`,{
            method: 'POST',
            body: JSON.stringify({
                new_content_title,
                new_content_description,
                new_content_dependencies,
                book_id: match.params.book_id
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
                setNewContentTitle('');
                setNewContentDescription('');
                setNewContentDialog(false);
                reloadContents();
            } else {
                console.error(res.error);
            }
        })
        .catch(err => {
            console.error(err)
        });
    }

    if (loading_contents) return <Loader />;

    return (
        <div>
            {
                contents.map(content => 
                    <Card 
                    key={content.id} 
                    style={{marginTop: 15, backgroundColor: content.recomended ? 'white' : 'lightgray'}}>
                        <CardActionArea onClick={() => history.push(`${location.pathname}/${content.id}`)}>
                            <div className={styles.Points}>
                                <Estrella 
                                    filled={Boolean(localStorage.getItem(content.id))}
                                    color_value={parseFloat(localStorage.getItem(content.id) || '0')}
                                />
                            </div>
                            <CardHeader 
                                title={content.titulo}
                            />
                            <CardContent>
                            <Typography color="textSecondary" gutterBottom>
                                    {content.descripcion}
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
                onClick={() => setNewContentDialog(true)}>
                    Agregar nuevo contenido
                </Button>
            }
            <Dialog
            open={new_content_dialog}
            onClose={() => setNewContentDialog(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">
                    Nuevo contenido
                </DialogTitle>
                <DialogContent>
                    <FormControl fullWidth style={{marginBottom: 10}}>
                        <TextField 
                            autoFocus
                            label="Titulo"
                            onChange={({target}) => setNewContentTitle(target.value)}
                        />
                    </FormControl>
                    <FormControl fullWidth style={{marginBottom: 10}}>
                        <TextField 
                            label="Descripción"
                            multiline
                            onChange={({target}) => setNewContentDescription(target.value)}
                        />
                    </FormControl>
                    <FormControl style={{marginBottom: 10}} fullWidth>
                        <InputLabel id="demo-simple-select-label">Dependende de...</InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        multiple
                        value={new_content_dependencies}
                        onChange={({target}) => setNewContentDependencies(target.value as string[])}>
                            {   contents.map(content => 
                                    <MenuItem key={content.id} value={content.id}>
                                        {content.titulo}
                                    </MenuItem>
                            )}
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setNewContentDialog(false)} color="primary">
                        Cancelar
                    </Button>
                    <Button onClick={addContent} color="primary" autoFocus>
                        Crear
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default Book;