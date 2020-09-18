import { Book } from 'Types';

export interface HomeEditorReducer {
    type: 'setTitulo' | 'setDescripcion',
    payload: string
};

const reducer = (book: Book, {type, payload}: HomeEditorReducer) : Book => {
    switch (type) {
        case 'setTitulo': 
            return {
                ...book, 
                titulo: payload
            };
        case 'setDescripcion': 
            return {
                ...book, 
                descripcion: payload
            };
    };
};

export default reducer;