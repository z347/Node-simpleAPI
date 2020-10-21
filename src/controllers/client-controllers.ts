import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import bCrypt from 'bcryptjs';

import { ClientInterface } from '../models/client-model';
import { getAllClientEmails, createNewClient, findOneClientByEmail } from '../db/client-methods';
import errorsValidationResult from '../utils/result-express-validator';

interface InputsInterface {
    email: ClientInterface['email'];
    password: ClientInterface['password'];
}

const getAllClientsController = async (req: Request, res: Response): Promise<Response> => {
    try {
        const allClients = await getAllClientEmails();
        return res.status(200).json({ message: allClients });
    } catch (e) {
        return res.status(500).json({ errors: e.message });
    }
};

const registrationController = async (req: Request, res: Response): Promise<Response> => {
    try {
        const errorsResult = validationResult(req);

        if (!errorsResult.isEmpty()) {
            return errorsValidationResult(req, res, 400);
        }

        const { email, password }: InputsInterface = req.body;
        const encryptPassword = await bCrypt.hash(password, 12);
        await createNewClient(email, encryptPassword);
        return res.status(201).json({ message: 'Registration was successful.' });
    } catch (e) {
        return res.status(500).json({ errors: e.message });
    }
};

const loginController = async (req: Request, res: Response): Promise<Response> => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(401).json({ errors: 'Incorrect authorization data.' });
        }

        const { email, password }: InputsInterface = req.body;
        const user = await findOneClientByEmail(email);

        if (user) {
            const isEqual = await bCrypt.compare(password, user.password);

            if (!isEqual) {
                return res.status(401).json({ errors: 'Incorrect authorization data.' });
            }
        }

        return res.status(202).json({ message: 'Auth was successful.' });
    } catch (e) {
        return res.status(500).json({ errors: e.message });
    }
};

export { getAllClientsController, registrationController, loginController };
