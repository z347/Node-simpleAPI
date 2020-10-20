import { ProductModel } from '../models/product-model';
import { getCategoryId } from './category-methods';

const createNewProduct = async (
    category: string,
    name: string,
    price: number,
    expirationDate: string,
    amount: number
) => {
    try {
        const categoryId = await getCategoryId(category);
        const newProduct = new ProductModel({ category: categoryId, name, price, expirationDate, amount });
        return await newProduct.save();
    } catch (e) {
        return e.message;
    }
};

const getOneProduct = async (name: string) => {
    try {
        return await ProductModel.findOne({ name });
    } catch (e) {
        return e.message;
    }
};

const getAllProducts = async () => {
    try {
        return await ProductModel.find({});
    } catch (e) {
        return e.message;
    }
};

const deleteOneProduct = async (name: string) => {
    try {
        return await ProductModel.findOneAndDelete({ name });
    } catch (e) {
        return e.message;
    }
};

const getAllProductsByCategory = async (category: string) => {
    try {
        const categoryId = await getCategoryId(category);
        return await ProductModel.find({ category: categoryId });
    } catch (e) {
        return e.message;
    }
};

const updateOneProduct = async (
    newCategory: string,
    currentName: string,
    newPrice: number,
    newExpirationDate: string,
    newAmount: number,
    newName: string
) => {
    try {
        const categoryId = await getCategoryId(newCategory);
        return await ProductModel.findOneAndUpdate(
            {
                name: currentName
            },
            {
                $set: {
                    category: categoryId,
                    name: newName,
                    price: newPrice,
                    expirationDate: newExpirationDate,
                    amount: newAmount
                }
            }
        );
    } catch (e) {
        return e.message;
    }
};

export {
    createNewProduct,
    getOneProduct,
    getAllProducts,
    deleteOneProduct,
    getAllProductsByCategory,
    updateOneProduct
};
