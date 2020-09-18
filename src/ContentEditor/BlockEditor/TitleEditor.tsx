import React, { useState } from 'react';
import { Title } from 'Types';
import { TextField } from '@material-ui/core';

interface TitleProps {
    block: Title,
    disabled?: boolean,
    onChange: (block: Title) => void
};

const TitleEditor = ({block, onChange, disabled = false} : TitleProps) => {

    const [titulo, setTitulo] = useState(block.titulo);

    return (
        <TextField
            disabled={disabled}
            fullWidth
            value={titulo}
            label="Titulo"
            style={{marginBottom: 20}}
            variant="outlined"
            onChange={({target}) => {
                setTitulo(target.value);
                onChange({...block, titulo: target.value});
            }}
        />
    );
};

export default TitleEditor;