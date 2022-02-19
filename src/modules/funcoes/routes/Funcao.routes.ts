import { Router } from 'express'
import FuncoesController from '../controllers/FuncoesController';


const funcoesRouter = Router();
const funcoesController = new FuncoesController();


funcoesRouter.get('/', funcoesController.index)
funcoesRouter.get('/:id', funcoesController.show)
funcoesRouter.post('/', funcoesController.create)
funcoesRouter.put('/:id', funcoesController.update)
funcoesRouter.delete('/:id', funcoesController.delete)

export default funcoesRouter;
