import { Schema, model, Document } from 'mongoose';

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
});

const CategoryModel = model<CategoryInterface>('Category', CategorySchema);

export { CategoryInterface, CategoryModel };
