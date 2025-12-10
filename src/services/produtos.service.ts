import { Prisma, PrismaClient } from '@prisma/client';

export type ProdutoInput = {
    nome: string;
    descricao: string;
    preco: number;
    imagem?: string;
    estoque: number;
};

export type ProdutoUpdateInput = Partial<ProdutoInput>;

export class ProdutosService {
    constructor(private readonly prisma: PrismaClient) {}

    async list() {
        return this.prisma.produto.findMany({
            orderBy: { created_at: 'desc' },
        });
    }

    async getById(id: string) {
        return this.prisma.produto.findUnique({ where: { id } });
    }

    async create(data: ProdutoInput) {
        return this.prisma.produto.create({
            data: {
                ...data,
                preco: new Prisma.Decimal(data.preco),
            },
        });
    }

    async update(id: string, data: ProdutoUpdateInput) {
        const payload: Prisma.ProdutoUpdateInput = { ...data };
        if (typeof data.preco === 'number') {
            payload.preco = new Prisma.Decimal(data.preco);
        }

        return this.prisma.produto.update({
            where: { id },
            data: payload,
        });
    }

    async remove(id: string) {
        await this.prisma.produto.delete({ where: { id } });
    }
}
