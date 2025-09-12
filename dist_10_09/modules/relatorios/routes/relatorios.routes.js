"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = require("express");
var _RelatoriosController = _interopRequireDefault(require("../controllers/RelatoriosController"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const relatoriosRouter = (0, _express.Router)();
const controller = new _RelatoriosController.default();

// 🔹 Despesas
relatoriosRouter.get('/despesas', (req, res) => controller.despesas(req, res));
relatoriosRouter.get('/despesas/pdf', (req, res) => controller.despesasPdf(req, res));
relatoriosRouter.get('/despesas/excel', (req, res) => controller.despesasExcel(req, res));

// 🔹 Cobranças
relatoriosRouter.get('/cobrancas', (req, res) => controller.cobrancas(req, res));
relatoriosRouter.get('/cobrancas/pdf', (req, res) => controller.cobrancasPdf(req, res));
relatoriosRouter.get('/cobrancas/excel', (req, res) => controller.cobrancasExcel(req, res));
var _default = exports.default = relatoriosRouter;