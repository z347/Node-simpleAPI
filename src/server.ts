import { join } from 'path';
import dotenv from 'dotenv';

import App from './app';

// path to the current configuration file
const configFile = './src/config/.env.dev';

dotenv.config({ path: configFile });

const { SERVER_PORT } = process.env;
// transformation to number
const port = Number(SERVER_PORT);
const currentFile = join(__dirname);

const app = new App({
    port,
    currentFile
});

app.listen();
