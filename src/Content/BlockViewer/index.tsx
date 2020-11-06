import React from 'react';
import { Block, Title, Text, Image } from 'Types';
import Typography from '@material-ui/core/Typography';
import TitleViewer from './TitleViewer';
import TextViewer from './TextViewer';
import ImgViewer from './ImgViewer';

const BlockViewer = (block : Block) => {
    
    switch(block.tipo) {
        case 'Titulo': return <TitleViewer {...(block as Title)}/>;
        case 'Texto': return <TextViewer {...(block as Text)} />;
        case 'Imagen': return <ImgViewer {...(block as Image)}/>;
        default: return <Typography>El bloque definido no existe dentro de los bloques disponibles</Typography>;
    }
};

export default BlockViewer;