import { Book } from 'Types';

export interface Action {
    type: 'titulo' | 'descripcion' | 'clean',
    payload: string
};

export default function reducer (book: Book, {type, payload}: Action) : Book {

    switch (type) {
        case 'titulo': return {...book, titulo: payload};
        case 'descripcion': return {...book, descripcion: payload};
        case 'clean': return { titulo: '', descripcion: '', id: ''};
        default: return {...book};
    };
};