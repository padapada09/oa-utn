import { useState, useEffect, useCallback } from 'react';
import { Book } from 'Types';
import { get } from 'Services';

const useBooks = (): [Book[], boolean, () => void, string | undefined] => {

    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | undefined>();

    const reloadBooks = useCallback(async () => {
        setLoading(true);
        const response = await get<Book[]>('/books/get/all');
        if (response.success) {
            setBooks(response.data);
            setLoading(false);
        } else {
            setError(response.error);
            setLoading(false);
        };
    },[]);

    useEffect(() => {
        reloadBooks();
    },[reloadBooks]);

    return [books, loading, reloadBooks, error];
};

export default useBooks;