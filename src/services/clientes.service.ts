import { Prisma, PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

export type ClienteInput = {
    nome: string;
    email: string;
    senha: string;
    cpf: string;
};

export type ClienteUpdateInput = Partial<Omit<ClienteInput, 'cpf'>>;

export class ClientesService {
    constructor(private readonly prisma: PrismaClient) {}

    async list() {
        return this.prisma.cliente.findMany({
            orderBy: { created_at: 'desc' },
        });
    }

    async getById(id: string) {
        return this.prisma.cliente.findUnique({ where: { id } });
    }

    async create(data: ClienteInput) {
        const hashed = await bcrypt.hash(data.senha, 10);
        return this.prisma.cliente.create({
            data: {
                ...data,
                senha: hashed,
            },
        });
    }

    async update(id: string, data: ClienteUpdateInput) {
        const payload: Prisma.ClienteUpdateInput = { ...data };
        if (data.senha) {
            payload.senha = await bcrypt.hash(data.senha, 10);
        }

        return this.prisma.cliente.update({
            where: { id },
            data: payload,
        });
    }

    async remove(id: string) {
        await this.prisma.cliente.delete({ where: { id } });
    }
}
