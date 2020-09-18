import React from 'react';
import { Block, Image, Text, Title } from 'Types';
import ImageEditor from './ImageEditor';
import TitleEditor from './TitleEditor';
import TextEditor from './TextEditor';

interface BlockProps {
    block: Block,
    onChange: (block: Block) => void,
    disabled?: boolean
};

const BlockEditor = ({block, onChange, ...props} : BlockProps) => {

    switch (block.tipo) {
        case 'Imagen': return <ImageEditor block={block as Image} {...props}/>;
        case 'Texto': return <TextEditor block={block as Text} onChange={onChange} {...props} />;
        case 'Titulo': return <TitleEditor block={block as Title} onChange={onChange}  {...props} />;
        default: return <h1>Bloque desconocido</h1>;
    };
};

export default BlockEditor;