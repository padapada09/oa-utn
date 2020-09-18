import { Content } from 'Types';

export interface Action {
    type: 'titulo' | 'descripcion' | 'dependencias' | 'clean',
    payload: string | string[]
};

export default function reducer (content: Content, {type, payload}: Action) : Content {

    switch (type) {
        case 'titulo': return { ...content, titulo: payload as string };
        case 'descripcion': return { ...content, descripcion: payload as string };
        case 'dependencias': return { ...content, dependencias: payload as string[] };
        case 'clean': return { ...content, dependencias: [], titulo: '', descripcion: '', id: '' };
        default: return {...content};
    };
};