import { ClientModel } from '../models/client-model';

const getAllClientEmails = async () => {
    try {
        return await ClientModel.find({}, { email: 1 });
    } catch (e) {
        return e.message;
    }
};

const createNewClient = async (email: string, password: string) => {
    try {
        const user = new ClientModel({ email, password });
        return await user.save();
    } catch (e) {
        return e.message;
    }
};

const findOneClientByEmail = async (email: string) => {
    try {
        return await ClientModel.findOne({ email });
    } catch (e) {
        return e.message;
    }
};

export { getAllClientEmails, createNewClient, findOneClientByEmail };
