import { useState, useEffect, useCallback } from 'react';
import { Block } from 'Types';

const useBlocks = (content_id: string): [Block[], boolean, () => void] => {

    const [blocks, setBlocks] = useState<Block[]>([]);
    const [loading, setLoading] = useState(true);

    const reloadBlocks = useCallback(() => {
        fetch(`${process.env.REACT_APP_SERVER_URL}/blocks/getAll/${content_id}`)
        .then(res => res.json())
        .then(res => {
            setLoading(false);
            setBlocks(res as Block[]);
        })
        .catch(err => {
            setLoading(false);
            console.error(err);
        });
    },[content_id]);

    useEffect(() => {
        reloadBlocks();
    },[reloadBlocks]);

    return [blocks, loading, reloadBlocks];
};

export default useBlocks;