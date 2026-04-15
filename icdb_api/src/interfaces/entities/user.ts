import { Document } from "mongoose";

export interface Token {
    key: string;
    created?: Date;
}

export interface User extends Document {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    isAdmin: boolean;
    isActive: boolean;
    dateJoined: Date;
    lastLogin?: Date;
    token?: Token;
    validatePassword(confirmPassword: string): Promise<boolean>;
}