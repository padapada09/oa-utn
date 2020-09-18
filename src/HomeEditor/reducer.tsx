import { Book } from 'Types';

export interface Action {
    id?: string,
    payload: Book | Book[]
};

export default function reducer (books: Book[], {id, payload}: Action) : Book[] {

    if (!id) return payload as Book[];

    const index_of_edited_book = books.findIndex(book => book.id === id);
    let modified_books = [...books]
    modified_books.splice(index_of_edited_book,1,payload as Book);

    return modified_books;

};