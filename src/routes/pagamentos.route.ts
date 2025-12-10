import { Router } from 'express';
import prisma from '@/prisma/client';
import { PagamentoPixService } from '@/services/pagamentoPix.service';
import { PagamentoPixController } from '@/controllers/pagamentoPix.controller';
import { Authentication } from '@/middleware/auth.middleware';

const pagamentoPixService = new PagamentoPixService(prisma);
const pagamentoPixController = new PagamentoPixController(pagamentoPixService);

const router = Router();

router.post('/pix/:pedidoId', Authentication(), pagamentoPixController.create.bind(pagamentoPixController));
router.patch('/pix/:pedidoId/status', Authentication(), pagamentoPixController.updateStatus.bind(pagamentoPixController));

export default router;
