"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = require("express");
var _DashboardController = _interopRequireDefault(require("../controllers/DashboardController"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const dashboardRouter = (0, _express.Router)();
const controller = new _DashboardController.default();
dashboardRouter.get('/receitas-por-pagamento', (req, res) => controller.receitasPorPagamento(req, res));
dashboardRouter.get('/receitas-vs-despesas', (req, res) => controller.receitasVsDespesas(req, res));
dashboardRouter.get('/resumo-financeiro', (req, res) => controller.resumoFinanceiro(req, res));
var _default = exports.default = dashboardRouter;