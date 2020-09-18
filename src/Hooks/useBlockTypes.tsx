import { useState, useEffect } from 'react';
import { Block, Title, Text } from 'Types';

const _blocks : Block[] = [
    {
        tipo: 'Titulo',
        titulo: '',
        id: 'Titulo'
    } as Title,
    {
        tipo: 'Texto',
        texto: '',
        id: 'Texto'
    } as Text,
];

const useBlockTypes = () : Block[] => {
    const [blocks, setBlocks] = useState<Block[]>([]);

    useEffect(() => {
        setBlocks(_blocks);
    },[]);

    return blocks;
};

export default useBlockTypes;