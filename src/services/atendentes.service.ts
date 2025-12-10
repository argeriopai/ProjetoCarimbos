import { PrismaClient } from '@prisma/client';

export type AtendenteInput = {
    nome: string;
    email: string;
    userId: string;
};

export class AtendentesService {
    constructor(private readonly prisma: PrismaClient) {}

    async list() {
        return this.prisma.atendente.findMany({
            orderBy: { created_at: 'desc' },
            include: { user: true },
        });
    }

    async getById(id: string) {
        return this.prisma.atendente.findUnique({
            where: { id },
            include: { user: true },
        });
    }

    async create(data: AtendenteInput) {
        return this.prisma.atendente.create({
            data: {
                nome: data.nome,
                email: data.email,
                user: {
                    connect: { id: data.userId },
                },
            },
            include: { user: true },
        });
    }
}
