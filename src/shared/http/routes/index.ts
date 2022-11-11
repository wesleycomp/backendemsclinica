import funcoesRouter from '@modules/funcao/routes/Funcao.routes';
import pacientesRouter from '@modules/paciente/routes/Pacientes.routes';
import empresasRouter from '@modules/empresa/routes/Empresa.routes';
import SessionsController from '@modules/users/controllers/SessionsController';
import especialidadeMedicaRouter from '@modules/especialidademedica/routes/EspecialidadeMedica.routes';
import passwordRouter from '@modules/users/routes/password.routes';
import profileRouter from '@modules/users/routes/profile.routes';
import sessionsRouter from '@modules/users/routes/sessions.routes';
import usersRouter from '@modules/users/routes/users.routes';
import exameRouter from '@modules/exame/routes/Exame.routes';

import { Router } from 'express';
import convenioempresaRouter from '@modules/convenioempresa/routes/ConvenioEmpresa.routes';
import categoriatrabalhadoresRouter from '@modules/categoriaTrabalhadores/routes/CategoriaTrabalhadores.routes';
import nacionalidadeRouter from '@modules/nacionalidade/routes/Nacionalidade.routes';
import tipoasoRouter from '@modules/tipoaso/routes/TipoAso.routes';
import medicoRouter from '@modules/medico/routes/Medicos.routes';


const routes = Router();
routes.use('/empresa', empresasRouter);
routes.use('/funcao', funcoesRouter);
routes.use('/user', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);
routes.use('/profile', profileRouter);
routes.use('/paciente', pacientesRouter);
routes.use('/exame', exameRouter);
routes.use('/especialidademedica', especialidadeMedicaRouter);
routes.use('/convenioempresa', convenioempresaRouter);
routes.use('/categoriatrabalhador',  categoriatrabalhadoresRouter);
routes.use('/nacionalidade',  nacionalidadeRouter);
routes.use('/tipoaso',  tipoasoRouter);
routes.use('/medico',  medicoRouter);

routes.use('/', ( request, response) => {
    return response.json({ message: 'Hello Dev'});
});

export default routes;
