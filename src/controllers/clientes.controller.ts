import { Request, Response } from 'express';
import { ClientesService } from '@/services/clientes.service';

export class ClientesController {
    constructor(private readonly clientesService: ClientesService) {}

    async list(request: Request, response: Response) {
        const clientes = await this.clientesService.list();
        return response.json(clientes);
    }

    async getById(request: Request, response: Response) {
        const { id } = request.params as { id: string };
        const cliente = await this.clientesService.getById(id);
        if (!cliente) {
            return response.status(404).json({ message: 'Cliente não encontrado' });
        }
        return response.json(cliente);
    }

    async create(request: Request, response: Response) {
        try {
            const { nome, email, senha, cpf } = request.body;
            const cliente = await this.clientesService.create({ nome, email, senha, cpf });
            return response.status(201).json(cliente);
        } catch (error: any) {
            return response.status(400).json({ message: error.message ?? 'Erro ao criar cliente' });
        }
    }

    async update(request: Request, response: Response) {
        const { id } = request.params as { id: string };
        try {
            const cliente = await this.clientesService.update(id, request.body);
            return response.json(cliente);
        } catch (error: any) {
            return response.status(400).json({ message: error.message ?? 'Erro ao atualizar cliente' });
        }
    }

    async remove(request: Request, response: Response) {
        const { id } = request.params as { id: string };
        await this.clientesService.remove(id);
        return response.json({ message: 'Cliente removido com sucesso' });
    }
}
