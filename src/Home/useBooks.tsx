import { useState, useEffect, useCallback } from 'react';
import { Book } from 'Types';

const useBooks = (): [Book[], boolean, () => void] => {

    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(true);

    const reloadBooks = useCallback(() => {
        setLoading(true);
        fetch(`${process.env.REACT_APP_SERVER_URL}/books/getAll`)
        .then(res => res.json())
        .then(res => {
            setBooks(res as Book[]);
            setLoading(false);
        })
        .catch(err => {
            setLoading(false);
            console.error("Tuvimos un problema al cargar los libros",err);
        });
    },[]);

    useEffect(() => {
        reloadBooks();
    },[reloadBooks]);

    return [books, loading, reloadBooks];
};

export default useBooks;