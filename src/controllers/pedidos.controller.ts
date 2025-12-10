import { Request, Response } from 'express';
import { PedidosService } from '@/services/pedidos.service';

export class PedidosController {
    constructor(private readonly pedidosService: PedidosService) {}

    async list(request: Request, response: Response) {
        const { clienteId, atendenteId } = request.query as {
            clienteId: string;
            atendenteId: string;
        };

        const pedidos = await this.pedidosService.list({ clienteId, atendenteId });
        return response.json(pedidos);
    }

    async getById(request: Request, response: Response) {
        const { id } = request.params as { id: string };
        const pedido = await this.pedidosService.getById(id);
        if (!pedido) {
            return response.status(404).json({ message: 'Pedido não encontrado' });
        }
        return response.json(pedido);
    }

    async create(request: Request, response: Response) {
        const { clienteId, atendenteId, itens } = request.body;
        try {
            const pedido = await this.pedidosService.create({
                clienteId,
                atendenteId,
                itens,
            });
            return response.status(201).json(pedido);
        } catch (error: any) {
            return response.status(400).json({ message: error.message ?? 'Erro ao criar pedido' });
        }
    }
}
