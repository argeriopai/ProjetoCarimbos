import { Router } from 'express';
import prisma from '@/prisma/client';
import { ClientesService } from '@/services/clientes.service';
import { ClientesController } from '@/controllers/clientes.controller';
import { Authentication } from '@/middleware/auth.middleware';

const clientesService = new ClientesService(prisma);
const clientesController = new ClientesController(clientesService);

const router = Router();

router.get('/', Authentication(), clientesController.list.bind(clientesController));
router.get('/:id', Authentication(), clientesController.getById.bind(clientesController));
router.post('/', Authentication(), clientesController.create.bind(clientesController));
router.put('/:id', Authentication(), clientesController.update.bind(clientesController));
router.delete('/:id', Authentication(), clientesController.remove.bind(clientesController));

export default router;
