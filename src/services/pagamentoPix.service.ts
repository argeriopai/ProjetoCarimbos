import { PrismaClient } from '@prisma/client';

export type CreatePagamentoPixInput = {
    pedidoId: string;
    qrcode: string;
    status: string;
};

export class PagamentoPixService {
    constructor(private readonly prisma: PrismaClient) {}

    async getByPedidoId(pedidoId: string) {
        return this.prisma.pagamentoPix.findUnique({
            where: { pedido_id: pedidoId },
        });
    }

    async create(data: CreatePagamentoPixInput) {
        return this.prisma.pagamentoPix.create({
            data: {
                pedido: { connect: { id: data.pedidoId } },
                qrcode: data.qrcode,
                status: data.status,
            },
        });
    }

    async updateStatus(pedidoId: string, status: string) {
        return this.prisma.pagamentoPix.update({
            where: { pedido_id: pedidoId },
            data: { status },
        });
    }
}
