import UserModel from "../../models/user";

export async function findUserByEmail(email: string) {
    return UserModel.findOne({ email });
}

export async function createUser(data: any) {
    return UserModel.create(data);
}

export async function updateUser(user: any) {
    return user.save();
}

export async function removeUserToken(user: any) {
    user.token = undefined;
    await user.save();
}