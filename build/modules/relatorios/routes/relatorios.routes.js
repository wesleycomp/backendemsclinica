"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var RelatoriosController_1 = __importDefault(require("../controllers/RelatoriosController"));
var relatoriosRouter = (0, express_1.Router)();
var controller = new RelatoriosController_1.default();
// 🔹 Despesas
relatoriosRouter.get('/despesas', function (req, res) { return controller.despesas(req, res); });
relatoriosRouter.get('/despesas/pdf', function (req, res) { return controller.despesasPdf(req, res); });
relatoriosRouter.get('/despesas/excel', function (req, res) { return controller.despesasExcel(req, res); });
// 🔹 Cobranças
relatoriosRouter.get('/cobrancas', function (req, res) { return controller.cobrancas(req, res); });
relatoriosRouter.get('/cobrancas/pdf', function (req, res) { return controller.cobrancasPdf(req, res); });
relatoriosRouter.get('/cobrancas/excel', function (req, res) { return controller.cobrancasExcel(req, res); });
exports.default = relatoriosRouter;
