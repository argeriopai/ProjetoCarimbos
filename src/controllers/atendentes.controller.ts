import { Request, Response } from 'express';
import { AtendentesService } from '@/services/atendentes.service';

export class AtendentesController {
    constructor(private readonly atendentesService: AtendentesService) {}

    async list(request: Request, response: Response) {
        const atendentes = await this.atendentesService.list();
        return response.json(atendentes);
    }

    async getById(request: Request, response: Response) {
        const { id } = request.params as { id: string };
        const atendente = await this.atendentesService.getById(id);
        if (!atendente) {
            return response.status(404).json({ message: 'Atendente não encontrado' });
        }
        return response.json(atendente);
    }

    async create(request: Request, response: Response) {
        const { nome, email, userId } = request.body;
        try {
            const atendente = await this.atendentesService.create({ nome, email, userId });
            return response.status(201).json(atendente);
        } catch (error: any) {
            return response.status(400).json({ message: error.message ?? 'Erro ao criar atendente' });
        }
    }
}
