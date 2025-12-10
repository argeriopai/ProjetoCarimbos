import { Request, Response } from 'express';
import { PagamentoPixService } from '@/services/pagamentoPix.service';

export class PagamentoPixController {
    constructor(private readonly pagamentoPixService: PagamentoPixService) {}

    async create(request: Request, response: Response) {
        const { pedidoId } = request.params as { pedidoId: string };
        const { qrcode, status } = request.body as { qrcode: string; status: string };
        try {
            const pagamento = await this.pagamentoPixService.create({ pedidoId, qrcode, status });
            return response.status(201).json(pagamento);
        } catch (error: any) {
            return response.status(400).json({ message: error.message ?? 'Erro ao registrar pagamento' });
        }
    }

    async updateStatus(request: Request, response: Response) {
        const { pedidoId } = request.params as { pedidoId: string };
        const { status } = request.body as { status: string };
        try {
            const pagamento = await this.pagamentoPixService.updateStatus(pedidoId, status);
            return response.json(pagamento);
        } catch (error: any) {
            return response.status(400).json({ message: error.message ?? 'Erro ao atualizar pagamento' });
        }
    }
}
