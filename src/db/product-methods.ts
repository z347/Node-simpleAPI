import { ProductModel, ProductInterface } from '../models/product-model';
import { getCategoryId } from './category-methods';

const createNewProduct = async (
    category: string,
    name: string,
    price: number,
    expirationDate: string,
    amount: number
): Promise<ProductInterface | null> => {
    try {
        const categoryId = await getCategoryId(category);
        const newProduct = new ProductModel({ category: categoryId, name, price, expirationDate, amount });
        return await newProduct.save();
    } catch (e) {
        return e.message;
    }
};

const getOneProduct = async (name: string): Promise<ProductInterface | null> => {
    try {
        return await ProductModel.findOne({ name });
    } catch (e) {
        return e.message;
    }
};

const getAllProducts = async (): Promise<ProductInterface[] | null> => {
    try {
        return await ProductModel.find({});
    } catch (e) {
        return e.message;
    }
};

const deleteOneProduct = async (name: string): Promise<ProductInterface | null> => {
    try {
        return await ProductModel.findOneAndDelete({ name });
    } catch (e) {
        return e.message;
    }
};

const getAllProductsByCategory = async (category: string): Promise<ProductInterface[] | null> => {
    try {
        const thisCategory = await getCategoryId(category);

        if (thisCategory !== null) {
            // eslint-disable-next-line no-underscore-dangle
            const id: string = thisCategory._id;
            return await ProductModel.find({ category: id });
        }

        return null;
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
): Promise<ProductInterface | null> => {
    try {
        const thisCategory = await getCategoryId(newCategory);

        if (thisCategory !== null) {
            // eslint-disable-next-line no-underscore-dangle
            const id: string = thisCategory._id;

            return await ProductModel.findOneAndUpdate(
                {
                    name: currentName
                },
                {
                    $set: {
                        category: id,
                        name: newName,
                        price: newPrice,
                        expirationDate: newExpirationDate,
                        amount: newAmount
                    }
                }
            );
        }
        return null;
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
