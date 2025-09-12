"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var FechamentoController_1 = __importDefault(require("../controllers/FechamentoController"));
var isAuthenticated_1 = __importDefault(require("@shared/http/middlewares/isAuthenticated"));
var fechamentosRouter = (0, express_1.Router)();
var controller = new FechamentoController_1.default();
fechamentosRouter.post('/', isAuthenticated_1.default, controller.create);
fechamentosRouter.get('/', isAuthenticated_1.default, controller.index);
// atualizar pagamento (recebimento)
fechamentosRouter.put('/:id/pagamento', isAuthenticated_1.default, controller.atualizarPagamento);
exports.default = fechamentosRouter;
