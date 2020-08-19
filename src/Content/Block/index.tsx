import React from 'react';
import { Block as BlockInterface } from 'Types';
import Typography from '@material-ui/core/Typography';
import Title from './Title';

const Block = ({tipo, contenido} : BlockInterface) => {
    
    switch(tipo) {
        case 'Titulo': return <Title contenido={contenido} />;
        case 'Texto': return <Typography style={{marginTop: 10}}>{contenido}</Typography>;
        case 'Imagen': return <img alt={contenido} style={{width: '100%'}} src={contenido} />
        default: return <h1>El bloque definido no existe dentro de los bloques disponibles</h1>;
    }
};

export default Block;