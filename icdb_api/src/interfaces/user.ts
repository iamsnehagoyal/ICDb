export interface Token {
    key: string;
    created?: Date;
}

export interface User {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    isAdmin: boolean;
    isActive: boolean;
    dateJoined: Date;
    lastLogin?: Date;
    token?: Token;
    validatePassword(confirmPassword: string): boolean;
}