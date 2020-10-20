import { CategoryModel } from '../models/category-model';

const getAllCategories = async () => {
    try {
        return await CategoryModel.find({}, { category: 1 });
    } catch (e) {
        return e.message;
    }
};

const setMainCategories = (array: string[]) => {
    try {
        return array.forEach((value) => {
            const query = { category: value };
            const update = { category: value };
            const options = { upsert: true, new: true, setDefaultsOnInsert: true };

            CategoryModel.findOneAndUpdate(query, update, options, (error) => {
                if (error) return error;
                return true;
            });
        });
    } catch (e) {
        return e.message;
    }
};

const getCategoryId = async (category: string) => {
    try {
        return await CategoryModel.findOne({ category }, { _id: 1 });
    } catch (e) {
        return e.message;
    }
};

export { getAllCategories, setMainCategories, getCategoryId };
