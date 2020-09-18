import { Content } from 'Types';

export interface Action {
    id?: string,
    payload: Content | Content[]
};

export default function reducer (contents: Content[], {id, payload}: Action) : Content[] {

    if (!id) return payload as Content[];

    const index_of_edited_book = contents.findIndex(content => content.id === id);
    let modified_contents = [...contents]
    modified_contents.splice(index_of_edited_book,1,payload as Content);

    return modified_contents;

};