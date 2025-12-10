import { Request, Response } from 'express';
import { ProdutosService } from '@/services/produtos.service';

export class ProdutosController {
    constructor(private readonly produtosService: ProdutosService) {}

    async list(request: Request, response: Response) {
        const produtos = await this.produtosService.list();
        return response.json(produtos);
    }

    async getById(request: Request, response: Response) {
        const { id } = request.params as { id: string };
        const produto = await this.produtosService.getById(id);
        if (!produto) {
            return response.status(404).json({ message: 'Produto não encontrado' });
        }
        return response.json(produto);
    }

    async create(request: Request, response: Response) {
        try {
            const { nome, descricao, preco, imagem, estoque } = request.body;
            const produto = await this.produtosService.create({ nome, descricao, preco, imagem, estoque });
            return response.status(201).json(produto);
        } catch (error: any) {
            return response.status(400).json({ message: error.message ?? 'Erro ao criar produto' });
        }
    }

    async update(request: Request, response: Response) {
        const { id } = request.params as { id: string };
        try {
            const produto = await this.produtosService.update(id, request.body);
            return response.json(produto);
        } catch (error: any) {
            return response.status(400).json({ message: error.message ?? 'Erro ao atualizar produto' });
        }
    }

    async remove(request: Request, response: Response) {
        const { id } = request.params as { id: string };
        await this.produtosService.remove(id);
        return response.json({ message: 'Produto removido com sucesso' });
    }
}
