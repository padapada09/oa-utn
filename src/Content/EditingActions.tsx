import React, { useState } from 'react';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { Block } from 'Types';

interface EditingActionsProps {
    index_selector: number,
    setIndexSelector: (index: number | ((previous_index: number) => number)) => void,
    blocks: Block[],
    content_id: string,
    reloadBlocks: () => void
}

const EditingActions = ({index_selector, blocks, content_id, reloadBlocks, setIndexSelector}: EditingActionsProps) => {

    const [new_block_dialog, setNewBlockDialog] = useState<boolean>(false);
    const [new_block_type, setNewBlockType] = useState<string>('');
    const [new_block_content, setNewBlockContent] = useState<string>('');

    async function addBlock() {

        const previous_block_id = index_selector ? blocks[index_selector - 1].id : null;
        const next_block_id = index_selector < blocks.length ? blocks.length ? blocks[index_selector].id : null : null;

        fetch(`${process.env.REACT_APP_SERVER_URL}/blocks/add`,{
            method: 'POST',
            body: JSON.stringify({
                new_block_type,
                new_block_content,
                content_id: content_id,
                previous_block_id,
                next_block_id
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
                setNewBlockType('');
                setNewBlockContent('');
                setNewBlockDialog(false);
                reloadBlocks();
                setIndexSelector(prev => prev+1);
            } else {
                console.error(res.error);
            }
        })
        .catch(err => {
            console.error(err)
        });
    }

    async function deleteBlock(){
        if (index_selector === 0) return;
        fetch(`${process.env.REACT_APP_SERVER_URL}/blocks/delete`,{
            method: 'POST',
            body: JSON.stringify({
                block_id: blocks[index_selector - 1].id,
                previous_block_id: blocks[index_selector - 1].id_bloque_anterior
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
                setIndexSelector((prev: number) => prev - 1);
                reloadBlocks();
            } else {
                console.error(res.error);
            }
        })
        .catch(err => {
            console.error(err)
        });
    }

    if (process.env.REACT_APP_MODE !== 'editor') return null;

    return (
        <>
            <Fab 
            onClick={deleteBlock}
            color="secondary"
            aria-label="index_editor_up"
            style={{
                position: 'fixed', 
                bottom: 'calc(15vw + 225px)', 
                right: '5vw',
                zIndex: 1
            }}>
                <DeleteIcon/>
            </Fab>
            <Fab 
            onClick={() => setIndexSelector((prev: number) => prev > 0 ? prev - 1 : 0)}
            color="secondary"
            aria-label="index_editor_up"
            style={{
                position: 'fixed', 
                bottom: 'calc(15vw + 150px)', 
                right: '5vw',
                zIndex: 1
            }}>
                <ExpandLessIcon/>
            </Fab>
            <Fab 
            onClick={() => setIndexSelector((prev: number) => prev < blocks.length ? prev + 1 : prev)}
            color="secondary"
            aria-label="index_editor_down"
            style={{
                position: 'fixed', 
                bottom: 'calc(15vw + 75px)', 
                right: '5vw',
                zIndex: 1
            }}>
                <ExpandMoreIcon/>
            </Fab>
            <Fab 
            onClick={() => setNewBlockDialog(true)}
            color="secondary"
            aria-label="add"
            style={{
                position: 'fixed', 
                bottom: '15vw', 
                right: '5vw',
                zIndex: 1
            }}>
                <AddIcon/>
            </Fab>
            <Dialog
            open={new_block_dialog}
            onClose={() => setNewBlockDialog(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">
                    Nuevo bloque
                </DialogTitle>
                <DialogContent>
                    <FormControl style={{marginBottom: 10, width: 100}}>
                        <InputLabel id="demo-simple-select-label">Tipo</InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={new_block_type}
                        onChange={({target}) => setNewBlockType(String(target.value))}>
                            <MenuItem value={'Titulo'}>Titulo</MenuItem>
                            <MenuItem value={'Texto'}>Texto</MenuItem>
                            <MenuItem value={'Imagen'}>Imagen</MenuItem>
                        </Select>
                    </FormControl>
                    {   new_block_type &&
                        <FormControl fullWidth style={{marginBottom: 10}}>
                            <TextField 
                                label={new_block_type}
                                multiline={new_block_type === 'Texto'}
                                rows={6}
                                onChange={({target}) => setNewBlockContent(target.value)}
                            />
                        </FormControl>
                    }
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setNewBlockDialog(false)} color="primary">
                        Cancelar
                    </Button>
                    <Button onClick={addBlock} color="primary">
                        Crear
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default EditingActions;