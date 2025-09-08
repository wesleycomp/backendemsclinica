import funcoesRouter from '@modules/funcao/routes/Funcao.routes';
import pacientesRouter from '@modules/paciente/routes/Pacientes.routes';
import empresasRouter from '@modules/empresa/routes/Empresa.routes';
import SessionsController from '@modules/users/controllers/SessionsController';
import procedimentosRouter from '@modules/procedimentos/routes/Procedimentos.routes';
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
import tipoPagamentoRouter from '@modules/tipopagamento/routes/TipoPagamento.routes';
import AsoRouter from '@modules/aso/routes/Asos.routes';
import ExamesAsoRouter from '@modules/aso/routes/ExameAso.routes';
import FichaClinicaRouter from '@modules/fichaclinica/routes/FichaClinica.routes';
import FinanceiroRouter from '@modules/financeiro/routes/Financeiro.routes';
import MedicoExaminadorRouter from '@modules/medicoexaminador/routes/MedicoExaminador.routes';
import centroCustoRouter from '@modules/centroCusto/routes/CentroCusto.routes';
import categoriaDespesaRouter from '@modules/categoriaDespesa/routes/CategoriaDespesa.routes'
import despesaRouter from '@modules/despesas/routes/Despesa.routes';
import despesaParcelaRouter from '@modules/despesas/routes/DespesaParcela.routes';
import fornecedorsRouter from '@modules/fornecedor/routes/Fornecedores.routes';
import contaBancariaRouter from '@modules/contabancaria/routes/ContaBancaria.routes';
import fechamentosRouter from '@modules/fechamento/routes/fechamentos.routes';

import dashboardRouter from '@modules/dashboard/routes/dashboard.routes';
import relatoriosRouter from '@modules/relatorios/routes/relatorios.routes';
import importFechamentoRoutes from '@modules/fechamento/routes/import.routes';

const routes = Router();
routes.use('/fechamento', importFechamentoRoutes);

routes.use('/relatorios', relatoriosRouter);

routes.use('/dashboard', dashboardRouter);
routes.use('/conta-bancaria', contaBancariaRouter);
routes.use('/fornecedor', fornecedorsRouter);
routes.use('/fechamentos', fechamentosRouter);
routes.use('/centro-custo', centroCustoRouter);
routes.use('/categoria-despesa', categoriaDespesaRouter);
routes.use('/despesas', despesaRouter);
routes.use('/despesa-parcelas', despesaParcelaRouter);
routes.use('/empresa', empresasRouter);
routes.use('/funcao', funcoesRouter);
routes.use('/user', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);
routes.use('/profile', profileRouter);
routes.use('/paciente', pacientesRouter);
routes.use('/exame', exameRouter);
routes.use('/procedimentos', procedimentosRouter);
routes.use('/convenioempresa', convenioempresaRouter);
routes.use('/categoriatrabalhador', categoriatrabalhadoresRouter);
routes.use('/nacionalidade', nacionalidadeRouter);
routes.use('/tipoaso', tipoasoRouter);
routes.use('/tipopagamento', tipoPagamentoRouter);
routes.use('/medico',  medicoRouter);
routes.use('/aso',  AsoRouter);
routes.use('/examesaso',  ExamesAsoRouter);
routes.use('/fichaclinica', FichaClinicaRouter);
routes.use('/financeiro', FinanceiroRouter);
routes.use('/medicoexaminador', MedicoExaminadorRouter);

routes.use('/', ( request, response) => {
    return response.json({ message: 'Hello Dev'});
});

export default routes;
