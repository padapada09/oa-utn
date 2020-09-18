import { ServerResponse } from 'Types';
import Books from './Books';
import Contents from './Contents';
import Blocks from './Blocks';

export { Books, Contents, Blocks };

export async function post<T = void>(url : string, body: any) : Promise<ServerResponse<T>> {
    try {
        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}${url}`,{
            method: 'POST',
            body: JSON.stringify(body),
            headers: {'Content-Type': 'application/json'}
        });
        if (!response.ok) return Promise.resolve({
            success: false,
            error: await response.text()
        } as ServerResponse<T>);
        const data = (await response.json()) as ServerResponse<T>;
        return Promise.resolve(data);
    } catch (error) {
        return Promise.resolve({
            success: false,
            error
        } as ServerResponse<T>);
    };
};

export async function get<T = void>(url : string) : Promise<ServerResponse<T>> {
    try {
        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}${url}`);
        if (!response.ok) return Promise.resolve({
            success: false,
            error: await response.text()
        } as ServerResponse<T>);
        const data = (await response.json()) as ServerResponse<T>;
        return Promise.resolve(data);
    } catch (error) {
        return Promise.resolve({
            success: false,
            error
        } as ServerResponse<T>);
    };
};