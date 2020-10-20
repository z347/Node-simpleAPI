import { check, ValidationChain } from 'express-validator';

import { findOneClientByEmail } from '../db/client-methods';

const registrationValidation: ValidationChain[] = [
    check('email')
        .isEmail()
        .withMessage('Enter the correct email.')
        .custom(async (email: string) => {
            try {
                const candidate = await findOneClientByEmail(email);
                if (candidate) {
                    return Promise.reject(new Error('This email is already in use.'));
                }
                return false;
            } catch (e) {
                return e.message;
            }
        }),

    check('password', 'The minimum password length is 6 characters.').isLength({ min: 6 }).trim(),

    check('confirm').custom((value: string, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Passwords do not match, please try again.');
        }
        return true;
    })
];

const loginValidation: ValidationChain[] = [
    check('email')
        .isEmail()
        .withMessage('Enter the correct email.')
        .custom(async (email: string) => {
            try {
                const candidate = await findOneClientByEmail(email);
                if (!candidate) {
                    return Promise.reject(new Error('There are no users with this email.'));
                }
                return false;
            } catch (e) {
                return e.message;
            }
        }),

    check('password', 'Введіть пароль.').exists()
];

export { registrationValidation, loginValidation };
