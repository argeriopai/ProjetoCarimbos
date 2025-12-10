import { Request, Response } from "express";
import * as UserService from "../services/users.service";

export const getAllUsers = async (req: Request, res: Response) => {
    const users = await UserService.list();
    res.json(users);
}

export const getUserById = async (req: Request, res: Response) => {
    const { id } = req.params as { id: string };
    const user = await UserService.getById(id);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
}

export const createUser = async (req: Request, res: Response) => {
    const { email, username, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }
    const existingUser = await UserService.getByEmail(email);
    if (existingUser) {
        return res.status(409).json({ message: 'Email already in use' });
    }
    const newUser = await UserService.create({ email, username, password });
    res.status(201).json(newUser);
}

export const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params as { id: string }
    try {
        await UserService.remove(id)

        return res.json({
            message: 'Usuário deletado com sucesso!'
        });
    } catch (error: any) {
        return res.json({
            message: error.message
        });
    }
}