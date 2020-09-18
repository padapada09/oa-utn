import { Client, ClientConfig } from 'pg';
import { ServerResponse } from 'Types';

const pg_client_settings : ClientConfig = {
    user: 'postgres',
    host: 'db',
    password: 'docker',
    database: 'oautn',
    port: 5432
};

export default class DB {
    static async query<T = any>(url: string, params?: string[]) : Promise<ServerResponse<T>> {
        const client = new Client(pg_client_settings);
        
        try {
            await client.connect();
            const response = await client.query<T>(url,params);
            return Promise.resolve({
                success: true,
                data: response.rows
            });
        } catch (error) {
            return Promise.resolve({
                success: false,
                error
            });
        } finally {
            client.end();
        };
    };
};