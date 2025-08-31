import { Router } from 'express';
import DashboardController from '../controllers/DashboardController';

const dashboardRouter = Router();
const controller = new DashboardController();

dashboardRouter.get('/receitas-por-pagamento', (req, res) =>
  controller.receitasPorPagamento(req, res)
);



dashboardRouter.get('/receitas-vs-despesas', (req, res) =>
  controller.receitasVsDespesas(req, res)
);

dashboardRouter.get('/resumo-financeiro', (req, res) =>
  controller.resumoFinanceiro(req, res)
);


export default dashboardRouter;
