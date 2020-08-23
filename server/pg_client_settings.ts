import { ClientConfig } from 'pg';

const pg_client_settings : ClientConfig = {
    user: 'postgres',
    host: 'db',
    password: 'docker',
    database: 'oautn',
    port: 5432
};

export default pg_client_settings;