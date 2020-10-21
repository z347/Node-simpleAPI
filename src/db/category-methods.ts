import { CategoryModel, CategoryInterface } from '../models/category-model';

const getAllCategories = async (): Promise<CategoryInterface[] | null> => {
    try {
        return await CategoryModel.find({}, { category: 1 });
    } catch (e) {
        return e.message;
    }
};

const setMainCategories = (categories: string[]): void => {
    try {
        return categories.forEach(async (value) => {
            const query = { category: value };
            const update = { category: value };
            const options = { upsert: true, new: true, setDefaultsOnInsert: true };

            await CategoryModel.findOneAndUpdate(query, update, options, (error) => {
                if (error) return error;
                return true;
            });
        });
    } catch (e) {
        return e.message;
    }
};

const getCategoryId = async (category: string): Promise<CategoryInterface | null> => {
    try {
        return await CategoryModel.findOne({ category }, { _id: 1 });
    } catch (e) {
        return e.message;
    }
};

export { getAllCategories, setMainCategories, getCategoryId };
