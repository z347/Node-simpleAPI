import enValid from 'envalid';

const { cleanEnv, port, str } = enValid;

const envValidation = (): void => {
    cleanEnv(process.env, {
        SERVER_PORT: port(),
        DB_URL: str()
    });
};

export default envValidation;
