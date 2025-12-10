import { Prisma, PrismaClient } from '@prisma/client';

export type PersonalizacaoInput = {
    texto: string;
    fonte?: string;
    modelo?: string;
};

export type ItemPedidoInput = {
    produtoId: string;
    quantidade: number;
    personalizacao?: PersonalizacaoInput;
};

export type CreatePedidoInput = {
    clienteId: string;
    atendenteId?: string;
    itens: ItemPedidoInput[];
};

export type ListPedidosParams = {
    clienteId?: string;
    atendenteId?: string;
};

export class PedidosService {
    constructor(private readonly prisma: PrismaClient) {}

    async list(params: ListPedidosParams = {}) {
        const { clienteId, atendenteId } = params;
        return this.prisma.pedido.findMany({
            where: {
                ...(clienteId ? { cliente_id: clienteId } : {}),
                ...(atendenteId ? { atendente_id: atendenteId } : {}),
            },
            orderBy: { created_at: 'desc' },
            include: {
                cliente: true,
                atendente: true,
                itens: {
                    include: {
                        produto: true,
                        personalizacao: true,
                    },
                },
                pagamentoPix: true,
            },
        });
    }

    async getById(id: string) {
        return this.prisma.pedido.findUnique({
            where: { id },
            include: {
                cliente: true,
                atendente: true,
                itens: {
                    include: {
                        produto: true,
                        personalizacao: true,
                    },
                },
                pagamentoPix: true,
            },
        });
    }

    async create(data: CreatePedidoInput) {
        if (!data.itens || data.itens.length === 0) {
            throw new Error('Pedido precisa de ao menos um item');
        }

        const produtos = await this.prisma.produto.findMany({
            where: { id: { in: data.itens.map((i) => i.produtoId) } },
        });

        if (produtos.length !== data.itens.length) {
            throw new Error('Um ou mais produtos não foram encontrados');
        }

        const produtoPorId = new Map(produtos.map((produto) => [produto.id, produto]));
        const total = data.itens.reduce((acc, item) => {
            const produto = produtoPorId.get(item.produtoId)!;
            const subtotal = (produto.preco as Prisma.Decimal).mul(item.quantidade);
            return acc.add(subtotal);
        }, new Prisma.Decimal(0));

        return this.prisma.pedido.create({
            data: {
                total,
                cliente: {
                    connect: { id: data.clienteId },
                },
                ...(data.atendenteId
                    ? {
                          atendente: {
                              connect: { id: data.atendenteId },
                          },
                      }
                    : {}),
                itens: {
                    create: data.itens.map((item) => {
                        const produto = produtoPorId.get(item.produtoId)!;
                        const baseItem: Prisma.ItemPedidoCreateWithoutPedidoInput = {
                            quantidade: item.quantidade,
                            preco_unit: produto.preco,
                            produto: {
                                connect: { id: item.produtoId },
                            },
                        };

                        if (item.personalizacao) {
                            baseItem.personalizacao = { create: item.personalizacao };
                        }

                        return baseItem;
                    }),
                },
            },
            include: {
                cliente: true,
                atendente: true,
                itens: {
                    include: {
                        produto: true,
                        personalizacao: true,
                    },
                },
            },
        });
    }
}
