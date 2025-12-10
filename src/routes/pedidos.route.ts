import { Router } from 'express';
import prisma from '@/prisma/client';
import { PedidosService } from '@/services/pedidos.service';
import { PedidosController } from '@/controllers/pedidos.controller';
import { Authentication } from '@/middleware/auth.middleware';

const pedidosService = new PedidosService(prisma);
const pedidosController = new PedidosController(pedidosService);

const router = Router();

router.get('/', Authentication(), pedidosController.list.bind(pedidosController));
router.get('/:id', Authentication(), pedidosController.getById.bind(pedidosController));
router.post('/', Authentication(), pedidosController.create.bind(pedidosController));

export default router;
