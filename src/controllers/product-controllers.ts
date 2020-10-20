import { Request, Response } from 'express';

import { ProductInterface } from '../models/product-model';
import errorsValidationResult from '../utils/result-express-validator';
import {
    createNewProduct,
    getAllProducts,
    deleteOneProduct,
    getOneProduct,
    getAllProductsByCategory,
    updateOneProduct
} from '../db/product-methods';

interface InputsInterface {
    category: ProductInterface['category'];
    name: ProductInterface['name'];
    price: ProductInterface['price'];
    expirationDate: ProductInterface['expirationDate'];
    amount: ProductInterface['amount'];
}

interface UpdateInputsInputsInterface {
    newCategory: ProductInterface['category'];
    currentName: ProductInterface['name'];
    newPrice: ProductInterface['price'];
    newExpirationDate: ProductInterface['expirationDate'];
    newAmount: ProductInterface['amount'];
    newName: ProductInterface['name'];
}

const createNewProductController = async (req: Request, res: Response) => {
    try {
        errorsValidationResult(req, res, 400);

        const { category, name, price, expirationDate, amount }: InputsInterface = req.body;
        await createNewProduct(category, name, price, expirationDate, amount);

        return res.status(201).json({ message: 'Product was created.' });
    } catch (e) {
        return res.status(500).json({ errors: e.message });
    }
};

const getOneProductController = async (req: Request, res: Response) => {
    try {
        errorsValidationResult(req, res, 400);

        const { name }: { name: string } = req.body;
        const product = await getOneProduct(name);
        return res.status(200).json({ message: product });
    } catch (e) {
        return res.status(500).json({ errors: e.message });
    }
};

const getAllProductsController = async (req: Request, res: Response) => {
    try {
        const allProducts = await getAllProducts();
        return res.status(200).json({ products: allProducts });
    } catch (e) {
        return res.status(500).json({ errors: e.message });
    }
};

const getAllProductsByCategoryController = async (req: Request, res: Response) => {
    try {
        errorsValidationResult(req, res, 400);

        const { category }: { category: string } = req.body;
        const allProductsByCategory = await getAllProductsByCategory(category);
        return res.status(200).json({ products: allProductsByCategory });
    } catch (e) {
        return res.status(500).json({ errors: e.message });
    }
};

const editOneProductController = async (req: Request, res: Response) => {
    try {
        errorsValidationResult(req, res, 400);

        const {
            newCategory,
            currentName,
            newPrice,
            newExpirationDate,
            newAmount,
            newName
        }: UpdateInputsInputsInterface = req.body;

        await updateOneProduct(newCategory, currentName, newPrice, newExpirationDate, newAmount, newName);

        return res.status(202).json({ message: 'Your request has been approved.' });
    } catch (e) {
        return res.status(500).json({ errors: e.message });
    }
};

const deleteOneProductController = async (req: Request, res: Response) => {
    try {
        errorsValidationResult(req, res, 400);

        const { name }: { name: string } = req.body;
        await deleteOneProduct(name);
        return res.status(200).json({ message: 'Product was deleted' });
    } catch (e) {
        return res.status(500).json({ errors: e.message });
    }
};

export {
    createNewProductController,
    getOneProductController,
    getAllProductsController,
    getAllProductsByCategoryController,
    editOneProductController,
    deleteOneProductController
};
