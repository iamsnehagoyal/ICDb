import { Request, Response } from "express";
import { registerValidationSchema, loginValidationSchema } from "../validators";
import { authService } from "../services";
import { STATUS_CODES } from "node:http";
import { ValidationError } from "joi";

export async function register(req: Request, res: Response) {
    try {
        const data = await registerValidationSchema.validateAsync(req.body);
        const result = await authService.register(data);
        return res.status(201).json(result);

    } catch (err: unknown) {
        if (err instanceof ValidationError) {
            return res.status(400).json({ detail: err.details });
        }
        return res.status(500).json({ detail: STATUS_CODES[500] });
    }
}

export async function login(req: Request, res: Response) {
    try {
        const data = await loginValidationSchema.validateAsync(req.body);
        const result = await authService.login(data);
        return res.status(201).json(result);

    } catch (err: unknown) {
        if (err instanceof ValidationError) {
            return res.status(400).json({ detail: err.details });
        }
        return res.status(500).json({ detail: STATUS_CODES[500] });
    }
}

export async function logout(req: Request, res: Response) {
    try {
        await authService.logout(req.user);
        return res.status(204).send();

    } catch (err: unknown) {
        return res.status(500).json({ detail: STATUS_CODES[500] });
    }
}

export async function profile(req: Request, res: Response) {
    try {
        const user = req.user;
        if (!user) {
            return res.status(404).json({ detail: STATUS_CODES[404] });
        }
        return res.status(200).json({
            id: user._id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            dateJoined: user.dateJoined,
            lastLogin: user.lastLogin,
        });
    } catch (err: unknown) {
        return res.status(500).json({ detail: STATUS_CODES[500] });
    }
}