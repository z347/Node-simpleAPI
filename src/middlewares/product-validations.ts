import { check, ValidationChain } from 'express-validator';

import { getCategoryId } from '../db/category-methods';
import { getOneProduct } from '../db/product-methods';

/* eslint-disable prettier/prettier */

const allFieldsValidation: ValidationChain[] = [
    check('category')
        .notEmpty()
        .withMessage('This field must be filled.')
        .isString()
        .withMessage('Invalid data type.')
        .custom(async (category: string) => {
            try {
                const categoryId = await getCategoryId(category);

                if (categoryId == null) {
                    return Promise.reject(new Error('Such the category does not exist.'));
                }

                return false;
            } catch (e) {
                return e.message;
            }
        }),

    check('name')
        .notEmpty()
        .withMessage('This field must be filled.')
        .isString()
        .withMessage('Invalid data type.')
        .custom(async (name: string) => {
            try {
                const notAvailableName = await getOneProduct(name);

                if (notAvailableName !== null) {
                    return Promise.reject(new Error('The product with this name already exists.'));
                }

                return false;
            } catch (e) {
                return e.message;
            }
        }),

    check('price')
        .notEmpty()
        .withMessage('This field must be filled.')
        .isNumeric()
        .withMessage('Invalid data type.'),

    check('expirationDate')
        .isDate()
        .withMessage('Invalid data type.'),

    check('amount')
        .notEmpty()
        .withMessage('This field must be filled.')
        .isNumeric()
        .withMessage('Invalid data type.')
        .exists()
];

const fieldNameValidation: ValidationChain[] = [
    check('name')
        .notEmpty()
        .withMessage('This field must be filled.')
        .isString()
        .withMessage('Invalid data type.')
        .custom(async (name: string) => {
            try {
                const availableName = await getOneProduct(name);

                if (availableName == null) {
                    return Promise.reject(new Error('No product with this name was found.'));
                }

                return false;
            } catch (e) {
                return e.message;
            }
        })
        .exists()
];

const fieldCategoryValidation: ValidationChain[] = [
    check('category')
        .notEmpty()
        .withMessage('This field must be filled.')
        .isString()
        .withMessage('Invalid data type.')
        .custom(async (category: string) => {
            try {
                const availableCategory = await getCategoryId(category);

                if (availableCategory == null) {
                    return Promise.reject(new Error('This category was not found.'));
                }

                return false;
            } catch (e) {
                return e.message;
            }
        })
        .exists()
];

export { allFieldsValidation, fieldNameValidation, fieldCategoryValidation };
