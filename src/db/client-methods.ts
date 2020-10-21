import { ClientModel, ClientInterface } from '../models/client-model';

const getAllClientEmails = async (): Promise<ClientInterface[] | null> => {
    try {
        return await ClientModel.find({}, { email: 1 });
    } catch (e) {
        return e.message;
    }
};

const createNewClient = async (email: string, password: string): Promise<ClientInterface | null> => {
    try {
        const user = new ClientModel({ email, password });
        return await user.save();
    } catch (e) {
        return e.message;
    }
};

const findOneClientByEmail = async (email: string): Promise<ClientInterface | null> => {
    try {
        return await ClientModel.findOne({ email });
    } catch (e) {
        return e.message;
    }
};

export { getAllClientEmails, createNewClient, findOneClientByEmail };
