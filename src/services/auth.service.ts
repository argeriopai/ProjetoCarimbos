import prisma from '../prisma/client'
import * as bcrypt from 'bcrypt'
import * as UserService from './users.service'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || "secret"

export const login = async (data: { email: string, password: string }) => {
    if (!data.email || !data.password) {
        throw new Error('Email e senha são obrigatórios');
    }
    
    const user = await UserService.getByEmail(data.email);
    
    if (!user) {
        throw new Error('Usuario não encontrado!');
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.password);
    if (!isPasswordValid) {
        throw new Error('Credenciais inválidas');
    }

    const token = jwt.sign(
        { id: user.id, email: user.email },
        JWT_SECRET,
        { expiresIn: "1h" }
    )

    return { token }
}

export const me = async (userId: string) => {
    const user = await UserService.getById(userId);
    if (!user) {
        throw new Error('Usuário não encontrado!');
    }

    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
}