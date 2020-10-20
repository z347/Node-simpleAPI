import { Schema, model, Document } from 'mongoose';

interface ProductInterface extends Document {
    category: string;
    name: string;
    price: number;
    expirationDate: string;
    amount: number;
}

const ProductSchema: Schema = new Schema({
    category: {
        required: true,
        ref: 'categories',
        type: Schema.Types.ObjectId
    },
    name: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    price: {
        type: Number,
        required: true
    },
    expirationDate: {
        type: Date,
        required: true
    },
    amount: {
        type: Number,
        required: true
    }
});

const ProductModel = model<ProductInterface>('Product', ProductSchema);

export { ProductInterface, ProductModel };
