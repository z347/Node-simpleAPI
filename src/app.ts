import express, { Application } from 'express';

import logger from './helpers/winston-loger';

class App {
    public app: Application;
    public port: number;
    public file: string;

    constructor(appInit: { port: number; currentFile: string }) {
        this.app = express();
        this.port = appInit.port;
        this.file = appInit.currentFile;
    }

    public listen(): void {
        this.app.listen(this.port, () => {
            try {
                console.info(`Server use port: ${this.port}`);
            } catch (error) {
                logger.error({
                    timestamp: '',
                    level: 'error',
                    errorIn: 'app.listen',
                    filePath: this.file,
                    code: error.code,
                    message: error.message,
                    stack: error.stack
                });
            }
        });
    }
}

export default App;
