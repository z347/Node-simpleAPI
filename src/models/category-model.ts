import { Schema, model, Document } from 'mongoose';

/* eslint-disable prettier/prettier */

interface CategoryInterface extends Document {
    _id: string;
    category: string;
}

const CategorySchema: Schema = new Schema({
    _id: {
        type: String
    },
    category: {
        type: String,
        unique: true,
        lowercase: true,
        required: true
    }
}, { versionKey: false });

const CategoryModel = model<CategoryInterface>('Category', CategorySchema);

export { CategoryInterface, CategoryModel };
