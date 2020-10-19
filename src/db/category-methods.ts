import { CategoryModel } from '../models/category';

const getAllCategories = async () => {
    try {
        return await CategoryModel.find({}, { category: 1 });
    } catch (e) {
        return console.error(e.message);
    }
};

const creatMainCategories = (array: string[]) => {
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
        return console.error(e.message);
    }
};

export { getAllCategories, creatMainCategories };
