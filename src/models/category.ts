import { Schema, model, Document } from 'mongoose';

interface CategoryInterface extends Document {
    category: string;
}

const CategorySchema: Schema = new Schema({
    category: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    }
});

const CategoryModel = model<CategoryInterface>('Category', CategorySchema);

export { CategoryInterface, CategoryModel };
