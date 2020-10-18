import winston from 'winston';
import WinstonDailyRotatingFile from 'winston-daily-rotate-file';

const { createLogger, transports, format } = winston;
const { combine, timestamp, prettyPrint } = format;

const myFormat = () => {
    return combine(timestamp({ format: 'HH:mm:ss DD-MM-YYYY' }), prettyPrint());
};

const logger: winston.Logger = createLogger({
    transports: [
        new transports.Console({
            format: myFormat()
        }),

        new WinstonDailyRotatingFile({
            level: 'error',
            datePattern: 'DD-MM-YYYY',
            dirname: './src/logs',
            filename: 'errors %DATE%.log',
            maxSize: '10m',
            zippedArchive: true,
            format: myFormat()
        })
    ]
});

export default logger;
