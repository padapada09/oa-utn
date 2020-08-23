import { useState, useEffect, useCallback } from 'react';
import { Book } from 'Types';

const useBooks = (): [Book[], boolean, () => void, string | undefined] => {

    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | undefined>();

    const reloadBooks = useCallback(() => {
        setLoading(true);
        fetch(`${process.env.REACT_APP_SERVER_URL}/books/getAll`)
        .then(res => res.json())
        .then(res => {
            if (res.error) {
                console.error("Error");
                setError(res.error);
                throw res.error;
            } else {
                setBooks(res as Book[]);
                setLoading(false);
            }
        })
        .catch(err => {
            setLoading(false);
            console.error("Tuvimos un problema al cargar los libros",err);
        });

    },[]);

    useEffect(() => {
        reloadBooks();
    },[reloadBooks]);

    return [books, loading, reloadBooks, error];
};

export default useBooks;