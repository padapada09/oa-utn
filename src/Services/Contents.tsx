import { Content, ServerResponse } from 'Types';
import { post, get } from 'Services';

export default class Contents {

    static async add (content: Content) : Promise<ServerResponse> {
        const response = await post('/contents/add',{content});
        return Promise.resolve(response);
    };

    static async remove (content_id: string) : Promise<ServerResponse> {
        const response = await get(`/contents/remove/${content_id}`);
        return Promise.resolve(response);
    };

    static async edit (content: Content) : Promise<ServerResponse> {
        const response = await post('/contents/edit',{content});
        return Promise.resolve(response);
    };

};