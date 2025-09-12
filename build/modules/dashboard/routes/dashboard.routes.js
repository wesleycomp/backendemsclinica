"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var DashboardController_1 = __importDefault(require("../controllers/DashboardController"));
var dashboardRouter = (0, express_1.Router)();
var controller = new DashboardController_1.default();
dashboardRouter.get('/receitas-por-pagamento', function (req, res) {
    return controller.receitasPorPagamento(req, res);
});
dashboardRouter.get('/receitas-vs-despesas', function (req, res) {
    return controller.receitasVsDespesas(req, res);
});
dashboardRouter.get('/resumo-financeiro', function (req, res) {
    return controller.resumoFinanceiro(req, res);
});
exports.default = dashboardRouter;
