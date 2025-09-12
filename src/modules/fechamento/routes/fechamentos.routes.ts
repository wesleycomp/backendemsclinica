import { Router } from 'express';
import FechamentoController from '../controllers/FechamentoController';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';

const fechamentosRouter = Router();
const controller = new FechamentoController();

fechamentosRouter.post('/', isAuthenticated, controller.create);
fechamentosRouter.get('/', isAuthenticated, controller.index);

// atualizar pagamento (recebimento)
fechamentosRouter.put('/:id/pagamento', isAuthenticated, controller.atualizarPagamento);

export default fechamentosRouter;
