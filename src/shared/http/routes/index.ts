import funcoesRouter from '@modules/funcoes/routes/Funcao.routes';
import SessionsController from '@modules/users/controllers/SessionsController';
import passwordRouter from '@modules/users/routes/password.routes';
import sessionsRouter from '@modules/users/routes/sessions.routes';
import usersRouter from '@modules/users/routes/users.routes';
import { Router } from 'express';

const routes = Router();
routes.use('/funcao', funcoesRouter);
routes.use('/user', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);

routes.use('/', ( request, response) => {

    return response.json({ message: 'Hello Dev'});

});


export default routes;
