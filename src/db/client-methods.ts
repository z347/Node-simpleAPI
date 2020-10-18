import { ClientModel } from '../models/client';

const createNewClient = async (email: string, password: string) => {
    try {
        const user = new ClientModel({ email, password });
        await user.save();
    } catch (e) {
        console.error(e.message);
    }
};

const findOneClientByEmail = async (email: string) => {
    try {
        return await ClientModel.findOne({ email });
    } catch (e) {
        return console.error(e.message);
    }
};

export { createNewClient, findOneClientByEmail };