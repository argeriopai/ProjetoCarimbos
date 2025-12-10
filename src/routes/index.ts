import { Router } from "express";
import usersRouter from './users.route';
import authRouter from './auth.route';
import clientesRouter from './clientes.route';
import produtosRouter from './produtos.route';
import pedidosRouter from './pedidos.route';
import pagamentosRouter from './pagamentos.route';
import atendentesRouter from './atendentes.route';

const router = Router();

router.use('/users', usersRouter);
router.use('/auth', authRouter);
router.use('/clientes', clientesRouter);
router.use('/produtos', produtosRouter);
router.use('/pedidos', pedidosRouter);
router.use('/pagamentos', pagamentosRouter);
router.use('/atendentes', atendentesRouter);

export default router;
