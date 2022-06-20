import funcoesRouter from '@modules/funcoes/routes/Funcao.routes';
import usersRouter from '@modules/users/routes/users.routes';
import { Router } from 'express';

const routes = Router();
routes.use('/funcao', funcoesRouter)
routes.use('/user', usersRouter)
routes.use('/', ( request, response) => {

    return response.json({ message: 'Hello Dev'});

});


export default routes;
