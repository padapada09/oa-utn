import { Block, ServerResponse } from 'Types';
import { post, get } from 'Services';

class Blocks {

    static async add(block : Block, content_id : string) : Promise<ServerResponse> {
        const response = await post(`/blocks/add/${content_id}`,{block});
        return Promise.resolve(response);
    };

    static async update(block: Block) : Promise<ServerResponse> {
        const response = await post(`/blocks/update`,{block});
        return Promise.resolve(response);
    };

    static async remove(block_id : string) : Promise<ServerResponse> {
        const response = await get(`/blocks/remove/${block_id}`);
        return Promise.resolve(response);
    };

    static async sort(block_id : string, new_index : number, previous_index : number) {
        const response = await get(`/blocks/sort/${block_id}/${new_index}/${previous_index}`);
        return Promise.resolve(response);
    };

};

export default Blocks;