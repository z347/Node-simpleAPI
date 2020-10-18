import mongoose from 'mongoose';

const connect = (URL: string): void => {
    const createConnect = () => {
        mongoose
            .connect(URL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
            .then((): void => console.info('MongoDB Atlas is connected'))
            .catch((error): void => {
                console.error(`Connection to MongoDB is rejected: ${error.message}`);
                return process.exit(1);
            });
    };

    createConnect();

    mongoose.connection.on('disconnected', createConnect);
};

export default connect;
