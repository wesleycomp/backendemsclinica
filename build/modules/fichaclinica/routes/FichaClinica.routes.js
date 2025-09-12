"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var FichaClinicaController_1 = __importDefault(require("../controllers/FichaClinicaController"));
var PerguntaFichaClinicaController_1 = __importDefault(require("../controllers/PerguntaFichaClinicaController"));
var celebrate_1 = require("celebrate");
var isAuthenticated_1 = __importDefault(require("../../../shared/http/middlewares/isAuthenticated"));
var fichaClinicasRouter = (0, express_1.Router)();
var fichaClinicaController = new FichaClinicaController_1.default();
var perguntaFichaClinicaController = new PerguntaFichaClinicaController_1.default();
fichaClinicasRouter.get('/', isAuthenticated_1.default, fichaClinicaController.index);
fichaClinicasRouter.get('/perguntas/', isAuthenticated_1.default, perguntaFichaClinicaController.index);
fichaClinicasRouter.get('/:aso_id', isAuthenticated_1.default, (0, celebrate_1.celebrate)((_a = {},
    _a[celebrate_1.Segments.PARAMS] = {
        aso_id: celebrate_1.Joi.string().uuid().required(),
    },
    _a)), fichaClinicaController.show);
fichaClinicasRouter.post('/', isAuthenticated_1.default, (0, celebrate_1.celebrate)((_b = {},
    _b[celebrate_1.Segments.BODY] = {
        aso_id: celebrate_1.Joi.string().required(),
        pergunta: celebrate_1.Joi.string().required(),
        resposta: celebrate_1.Joi.string().allow('', null).default(''),
        observacao: celebrate_1.Joi.string().allow('', null).default('')
    },
    _b)), fichaClinicaController.create);
fichaClinicasRouter.put('/resposta/:id', (0, celebrate_1.celebrate)((_c = {},
    _c[celebrate_1.Segments.BODY] = {
        resposta: celebrate_1.Joi.string().allow('', null).default(''),
    },
    _c[celebrate_1.Segments.PARAMS] = {
        id: celebrate_1.Joi.string().uuid().required(),
    },
    _c)), fichaClinicaController.updateResposta);
fichaClinicasRouter.put('/observacao/:id', isAuthenticated_1.default, (0, celebrate_1.celebrate)((_d = {},
    _d[celebrate_1.Segments.BODY] = {
        observacao: celebrate_1.Joi.string().allow('', null).default('')
    },
    _d[celebrate_1.Segments.PARAMS] = {
        id: celebrate_1.Joi.string().uuid().required(),
    },
    _d)), fichaClinicaController.updateObservacao);
fichaClinicasRouter.delete('/:id', isAuthenticated_1.default, (0, celebrate_1.celebrate)((_e = {},
    _e[celebrate_1.Segments.PARAMS] = {
        id: celebrate_1.Joi.string().uuid().required(),
    },
    _e)), fichaClinicaController.delete);
exports.default = fichaClinicasRouter;
