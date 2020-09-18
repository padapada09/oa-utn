import { useState, useEffect, useCallback } from 'react';
import { Content } from 'Types';
import { get } from 'Services';
import { sortDependencies } from 'Helpers';

const useContents = (book_id: string): [Content[], boolean, () => void] => {

    const [contents, setContents] = useState<Content[]>([]);
    const [loading, setLoading] = useState(true);

    const reloadContents = useCallback(async () => {
        setLoading(true);
        const response = await get<Content[]>(`/contents/get/${book_id}`);
        if (response.success) {
            setLoading(false);
            const contents = response.data;
            setContents(sortDependencies(contents));
        } else {
            console.error(response.error);
            setLoading(false);
        };
    },[book_id]);

    useEffect(() => {
        reloadContents();
    },[reloadContents]);

    return [contents, loading, reloadContents];
};

export default useContents;