import { Schema, model, Document } from 'mongoose';

interface ClientInterface extends Document {
    email: string;
    password: string;
}

const ClientSchema: Schema = new Schema({
    email: {
        type: String,
        unique: true,
        lowercase: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const ClientModel = model<ClientInterface>('Client', ClientSchema);

export { ClientInterface, ClientModel };
