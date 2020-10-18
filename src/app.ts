// Core
import express, { Application } from 'express';
import compression from 'compression';
import helmet from 'helmet';
import cors from 'cors';

// Develop mode
// eslint-disable-next-line import/no-extraneous-dependencies
import morgan from 'morgan';

// Local files
import logger from './utils/winston-loger';
import connect from './db/create-connection';
import router from './routes/auth-clients';

class App {
    public app: Application;
    public port: number;
    public file: string;
    public dbUrl: string;

    constructor(appInit: { port: number; currentFile: string; dbUrl: string }) {
        this.app = express();
        this.port = appInit.port;
        this.file = appInit.currentFile;
        this.dbUrl = appInit.dbUrl;

        this.initializeDatabase();
        this.forDevelopMode();
        this.initializeMiddlewares();
        this.initializeRoutes();
    }

    public listen(): void {
        this.app.listen(this.port, (): void => {
            try {
                return console.info(`Server use port: ${this.port}`);
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
                return process.exit(1);
            }
        });
    }

    public getServerInfo(): void {
        console.info(this.app);
    }

    private forDevelopMode() {
        this.app.use(morgan('dev'));
    }

    private initializeMiddlewares() {
        this.app.use(express.json());
        this.app.use(compression());
        this.app.use(helmet());
        this.app.use(cors());
    }

    // test
    private initializeRoutes() {
        this.app.use('/api/auth', router);
    }

    private initializeDatabase() {
        connect(this.dbUrl);
    }
}

export default App;
