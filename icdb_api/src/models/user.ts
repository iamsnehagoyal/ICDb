import { compare, genSalt, hash } from 'bcryptjs';
import {
    type CallbackError,
    type CallbackWithoutResultAndOptionalError,
    type Model,
    Schema,
    model,
    HydratedDocument
} from 'mongoose';

import { Token, User } from '../interfaces/entities/user';

type UserDocument = HydratedDocument<User>;

const tokenSchema: Schema<Token> = new Schema(
    {
        key: { type: String, unique: true, sparse: true },
    },
    { timestamps: { createdAt: 'created' } },
);

const userSchema: Schema<User> = new Schema({
    email: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: false, default: false },
    isActive: { type: Boolean, required: true, default: true },
    dateJoined: { type: Date, required: true, default: Date.now },
    lastLogin: { type: Date, required: false },
    token: { type: tokenSchema, required: false },
});

userSchema.pre(
    "save",
    async function (this: UserDocument) {
        if (!this.isModified("password")) return;

        const salt = await genSalt(12);
        this.password = await hash(this.password, salt);
    }
);

userSchema.methods.validatePassword = async function (
    this: UserDocument,
    candidatePassword: string
): Promise<boolean> {
    return compare(candidatePassword, this.password);
};

const UserModel: Model<User> = model<User>('User', userSchema);

export default UserModel;