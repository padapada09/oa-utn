import React from 'react';
import { Image } from 'Types';

interface ImageProps {
    block: Image,
    disabled?: boolean
};

const ImageEditor = ({block} : ImageProps) => {
    return (
        <img src={block.src}/>
    )
};

export default ImageEditor;