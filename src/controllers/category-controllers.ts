import { Request, Response } from 'express';
import { getAllCategories, setMainCategories } from '../db/category-methods';

const mainCategories: string[] = ['wine', 'laptops', 'bicycles', 'books', 'phones', 'beer'];

const getAllCategoryController = async (req: Request, res: Response) => {
    try {
        const allCategories = await getAllCategories();
        return res.status(200).json({ message: allCategories });
    } catch (e) {
        return res.status(500).json({ errors: e.message });
    }
};

const creatMainCategoriesController = async (req: Request, res: Response) => {
    try {
        await setMainCategories(mainCategories);
        return res.status(200).json({ message: 'Success' });
    } catch (e) {
        return res.status(500).json({ errors: e.message });
    }
};

export { getAllCategoryController, creatMainCategoriesController };
