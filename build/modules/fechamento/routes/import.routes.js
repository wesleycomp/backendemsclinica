"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/shared/http/routes/fechamento.routes.ts
var express_1 = require("express");
var multer_1 = __importDefault(require("multer"));
var ImportFechamentoController_1 = __importDefault(require("@modules/fechamento/controllers/ImportFechamentoController"));
// import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated'; // se usar auth
var routes = (0, express_1.Router)();
var upload = (0, multer_1.default)(); // memória
var controller = new ImportFechamentoController_1.default();
/**
 * NOVA rota para PDF
 * (se este router estiver montado em "/fechamento", o caminho final fica:
 *  POST /fechamento/import/pdf )
 */
routes.post('/import/pdf', 
// ensureAuthenticated, // (opcional) autentique antes de receber o arquivo
upload.single('file'), controller.importPdf.bind(controller));
/**
 * (Opcional) manter a rota antiga como alias, apontando para o mesmo handler de PDF.
 * Se quiser desativar de vez o XLS, deixe assim:
 */
routes.post('/import', 
// ensureAuthenticated,
upload.single('file'), controller.importPdf.bind(controller));
exports.default = routes;
