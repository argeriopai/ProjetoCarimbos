import { Router } from 'express';
import prisma from '@/prisma/client';
import { ProdutosService } from '@/services/produtos.service';
import { ProdutosController } from '@/controllers/produtos.controller';
import { Authentication } from '@/middleware/auth.middleware';

const produtosService = new ProdutosService(prisma);
const produtosController = new ProdutosController(produtosService);

const router = Router();

router.get('/', Authentication(), produtosController.list.bind(produtosController));
router.get('/:id', Authentication(), produtosController.getById.bind(produtosController));
router.post('/', Authentication(), produtosController.create.bind(produtosController));
router.put('/:id', Authentication(), produtosController.update.bind(produtosController));
router.delete('/:id', Authentication(), produtosController.remove.bind(produtosController));

export default router;
