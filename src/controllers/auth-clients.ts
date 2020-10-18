import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import bCrypt from 'bcryptjs';

import { ClientInterface } from '../models/client';
import { createNewClient, findOneClientByEmail } from '../db/client-methods';

interface InputsInterface {
    email: ClientInterface['email'];
    password: ClientInterface['password'];
}

const registrationController = async (req: Request, res: Response) => {
    try {
        const errors = validationResult(req);

        // Array with all errors
        const errorFormatter = ({ msg, param }: { msg: string; param: string }) => {
            return `${param} : ${msg}`;
        };

        if (!errors.isEmpty()) {
            const result = validationResult(req).formatWith(errorFormatter);
            return res.status(401).json({ errors: result.array() });
        }

        const { email, password }: InputsInterface = req.body;
        const encryptPassword = await bCrypt.hash(password, 12);
        await createNewClient(email, encryptPassword);
        return res.status(201).json({ message: 'Registration was successful.' });
    } catch (e) {
        return res.status(500).json({ errors: 'Something went wrong.' });
    }
};

const loginController = async (req: Request, res: Response) => {
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

        return res.status(200).json({ message: 'Auth was successful.' });
    } catch (e) {
        return res.status(500).json({ errors: 'Something went wrong.' });
    }
};

export { registrationController, loginController };
