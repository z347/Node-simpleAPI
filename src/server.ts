import { join } from 'path';
import dotEnv from 'dotenv';

import App from './app';
import validateEnv from './utils/env-validations';

const configFile = './src/config/.env.isDev'; // path to the dotEnv current configuration file

dotEnv.config({ path: configFile });

validateEnv();

const { SERVER_PORT, DB_URL } = process.env;

const port = Number(SERVER_PORT); // transformation to number
const dbUrl = String(DB_URL); // transformation to string
const currentFile = join(__dirname);

const app = new App({
    port,
    currentFile,
    dbUrl
});

app.listen();
