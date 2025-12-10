import { Router } from 'express';
import prisma from '@/prisma/client';
import { AtendentesService } from '@/services/atendentes.service';
import { AtendentesController } from '@/controllers/atendentes.controller';
import { Authentication } from '@/middleware/auth.middleware';

const atendentesService = new AtendentesService(prisma);
const atendentesController = new AtendentesController(atendentesService);

const router = Router();

router.get('/', Authentication(), atendentesController.list.bind(atendentesController));
router.get('/:id', Authentication(), atendentesController.getById.bind(atendentesController));
router.post('/', Authentication(), atendentesController.create.bind(atendentesController));

export default router;
