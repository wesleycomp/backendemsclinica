import funcoesRouter from '@modules/funcoes/routes/Funcao.routes';
import { Router } from 'express';

const routes = Router();
routes.use('/funcao', funcoesRouter)


export default routes;
