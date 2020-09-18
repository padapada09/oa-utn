import React from 'react';
import { Block, Title, Text } from 'Types';
import Typography from '@material-ui/core/Typography';
import TitleViewer from './TitleViewer';
import TextViewer from './TextViewer';

const BlockViewer = (block : Block) => {
    
    switch(block.tipo) {
        case 'Titulo': return <TitleViewer {...(block as Title)}/>;
        case 'Texto': return <TextViewer {...(block as Text)} />;
        // case 'Imagen': return <img alt={contenido} style={{width: '100%'}} src={contenido} />;
        default: return <Typography>El bloque definido no existe dentro de los bloques disponibles</Typography>;
    }
};

export default BlockViewer;