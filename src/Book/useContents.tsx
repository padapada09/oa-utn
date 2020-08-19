import { useState, useEffect, useCallback } from 'react';
import { Content } from 'Types';

const useContents = (book_id: string): [Content[], boolean, () => void] => {

    const [contents, setContents] = useState<Content[]>([]);
    const [loading, setLoading] = useState(true);

    const reloadContents = useCallback(() => {
        setLoading(true);
        fetch(`${process.env.REACT_APP_SERVER_URL}/getContenidos?book_id=${book_id}`)
        .then(res => res.json())
        .then(res => {
            const contenidos = res as Content[];

            setLoading(false);
            setContents(contenidos.map((contenidoA) => {

                const dependencies_approved = contenidoA.dependencias?.every(dependency_id => {
                    const dependencia = contenidos.find(contenido => contenido.id === dependency_id);
                    if (dependencia) {
                        const score = parseFloat(localStorage.getItem(dependency_id) || '0');
                        if (score > 0.6) return true;
                        else return false;
                    } else {
                        return true;
                    }
                });

                if (dependencies_approved === undefined || dependencies_approved) return {...contenidoA, recomended: true};
                else return {...contenidoA, recomended: false};

            }).sort((a,b) => a.dependencias.length - b.dependencias.length));
        })
        .catch(err => {
            setLoading(false);
            console.error(`Tuvimos un problema al buscar los contenidos para el libro ${book_id}. Error: ${err}`);
        })
    },[book_id]);

    useEffect(() => {
        reloadContents();
    },[reloadContents]);

    return [contents, loading, reloadContents];
};

export default useContents;