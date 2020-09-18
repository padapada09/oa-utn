import { useState, useEffect, useCallback } from 'react';
import { Block } from 'Types';
import { get } from 'Services';

const useBlocks = (content_id: string): [Block[], boolean, () => void] => {

    const [blocks, setBlocks] = useState<Block[]>([]);
    const [loading, setLoading] = useState(true);

    const reloadBlocks = useCallback(async () => {
        const response = await get<Block[]>(`/blocks/get/${content_id}`);

        if (response.success) {
            setBlocks(response.data);
        } else {
            console.error(response.error);
        };
        
        setLoading(false);
    },[content_id]);

    useEffect(() => {
        reloadBlocks();
    },[reloadBlocks]);

    return [blocks, loading, reloadBlocks];
};

export default useBlocks;