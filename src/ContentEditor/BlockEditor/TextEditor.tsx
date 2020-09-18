import React, { useState } from 'react';
import { Text, Block } from 'Types';
import { TextField } from '@material-ui/core';

interface TextProps {
    block: Text,
    onChange: (block: Text) => void,
    disabled?: boolean
};

const TextEditor = ({block, onChange} : TextProps) => {

    const [texto, setTexto] = useState(block.texto);

    return (
        <TextField 
            variant="outlined"
            label="Texto"
            value={texto}
            fullWidth
            multiline
            style={{marginBottom: 20}}
            onChange={({target}) => {
                setTexto(target.value);
                onChange({...block, texto: target.value});
            }}
        />
    )
};

export default TextEditor;