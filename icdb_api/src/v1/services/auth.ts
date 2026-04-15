import crypto from "crypto";
import { findUserByEmail, updateUser, createUser, removeUserToken } from "../repositories";

export async function register(data: any) {
    const existingUser = await findUserByEmail(data.email);

    if (existingUser) {
        throw new Error("User already exists");
    }

    const user = await createUser(data);

    return {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
    };
}

export async function login(data: any) {
    const { email, password } = data;

    const user = await findUserByEmail(email);

    if (!user) {
        throw new Error("Invalid credentials");
    }

    const isValid = await user.validatePassword(password);

    if (!isValid) {
        throw new Error("Invalid credentials");
    }

    const token = crypto.randomBytes(24).toString("hex");

    user.token = { key: token };
    user.lastLogin = new Date();

    await updateUser(user);

    return {
        token
    };
}

export async function logout(user: any) {
    await removeUserToken(user);
}