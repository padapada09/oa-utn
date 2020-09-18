import { Book, ServerResponse } from 'Types';
import { post, get } from 'Services';

export default class Books {

    static async add (book: Book) : Promise<ServerResponse> {
        const response = await post('/books/add',{book});
        return Promise.resolve(response);
    };

    static async remove (book_id: string) : Promise<ServerResponse> {
        const response = await get(`/books/remove/${book_id}`);
        return Promise.resolve(response);
    };

    static async edit (book: Book) : Promise<ServerResponse> {
        const response = await post('/books/edit',{book});
        return Promise.resolve(response);
    };

};