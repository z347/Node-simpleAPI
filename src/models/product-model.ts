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
        ref: 'categories',
        type: Schema.Types.ObjectId,
        required: true
    },
    name: {
        type: String,
        unique: true,
        lowercase: true,
        required: true
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
