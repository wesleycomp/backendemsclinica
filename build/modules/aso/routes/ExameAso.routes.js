"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b, _c, _d, _e, _f, _g, _h, _j;
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var ExameAsoController_1 = __importDefault(require("../controllers/ExameAsoController"));
var celebrate_1 = require("celebrate");
var isAuthenticated_1 = __importDefault(require("../../../shared/http/middlewares/isAuthenticated"));
var ExameAsoRouter = (0, express_1.Router)();
var exameAsoController = new ExameAsoController_1.default();
ExameAsoRouter.get('/historico/exameasoexcluida', isAuthenticated_1.default, exameAsoController.showExameAsoExcluidas);
ExameAsoRouter.get('/:aso_id', isAuthenticated_1.default, (0, celebrate_1.celebrate)((_a = {},
    _a[celebrate_1.Segments.PARAMS] = {
        aso_id: celebrate_1.Joi.string().uuid().required(),
    },
    _a)), exameAsoController.show);
ExameAsoRouter.get('/listexames/:datainicio/:datafim/:tipopagamento/:usuario/:empresa/:empresafora', isAuthenticated_1.default, (0, celebrate_1.celebrate)((_b = {},
    _b[celebrate_1.Segments.PARAMS] = {
        datainicio: celebrate_1.Joi.string().required(),
        datafim: celebrate_1.Joi.string().required(),
        tipopagamento: celebrate_1.Joi.string(),
        usuario: celebrate_1.Joi.string(),
        empresa: celebrate_1.Joi.string(),
        empresafora: celebrate_1.Joi.string(),
    },
    _b)), exameAsoController.showExamesPeriodo);
ExameAsoRouter.get(
// '/relatoriofechamamento/:datainicio/:datafim/:tipopagamento/:usuario/:empresa/:empresafora',
'/relatoriofechamamento/:datainicio/:datafim/:empresa/:tipopagamento/', isAuthenticated_1.default, (0, celebrate_1.celebrate)((_c = {},
    _c[celebrate_1.Segments.PARAMS] = {
        datainicio: celebrate_1.Joi.string().required(),
        datafim: celebrate_1.Joi.string().required(),
        empresa: celebrate_1.Joi.string(),
        tipopagamento: celebrate_1.Joi.string(),
    },
    _c)), exameAsoController.showRelatorioFechamentoEmpresa);
ExameAsoRouter.get('/valores/:aso_id', isAuthenticated_1.default, (0, celebrate_1.celebrate)((_d = {},
    _d[celebrate_1.Segments.PARAMS] = {
        aso_id: celebrate_1.Joi.string().uuid().required(),
    },
    _d)), exameAsoController.showAsoValores);
ExameAsoRouter.post('/', isAuthenticated_1.default, (0, celebrate_1.celebrate)((_e = {},
    _e[celebrate_1.Segments.BODY] = {
        aso_id: celebrate_1.Joi.string().required(),
        exame_id: celebrate_1.Joi.string().required(),
        valorexame: celebrate_1.Joi.number().required(),
        valormedico: celebrate_1.Joi.number().required(),
        valorems: celebrate_1.Joi.number().required(),
        ativo: celebrate_1.Joi.boolean().allow('', null).default('true'),
        tipopagamento_id: celebrate_1.Joi.string().required(),
        user_id: celebrate_1.Joi.string().required()
    },
    _e)), exameAsoController.create);
ExameAsoRouter.put('/desconto/:id', isAuthenticated_1.default, (0, celebrate_1.celebrate)((_f = {},
    _f[celebrate_1.Segments.BODY] = {
        id: celebrate_1.Joi.string().required(),
        desconto: celebrate_1.Joi.boolean().required(),
        valorexamesemdesconto: celebrate_1.Joi.number().required(),
        user_desconto: celebrate_1.Joi.string().required(),
        updated_at: celebrate_1.Joi.string().required()
    },
    _f)), exameAsoController.update);
ExameAsoRouter.delete('/:id/:usuario_id', isAuthenticated_1.default, (0, celebrate_1.celebrate)((_g = {},
    _g[celebrate_1.Segments.PARAMS] = {
        id: celebrate_1.Joi.string().uuid().required(),
        usuario_id: celebrate_1.Joi.string().uuid().required()
    },
    _g)), exameAsoController.delete);
ExameAsoRouter.get('/fechamentomedico/examesrealizados/:datainicio/:datafim/:medico_id/:exame_id', isAuthenticated_1.default, (0, celebrate_1.celebrate)((_h = {},
    _h[celebrate_1.Segments.PARAMS] = {
        datainicio: celebrate_1.Joi.string().required(),
        datafim: celebrate_1.Joi.string().required(),
        medico_id: celebrate_1.Joi.string().uuid().required(),
        exame_id: celebrate_1.Joi.string(),
    },
    _h)), exameAsoController.showFechamentoMedicoExames);
ExameAsoRouter.get('/listexames/:datainicio/:datafim/:idexame', isAuthenticated_1.default, (0, celebrate_1.celebrate)((_j = {},
    _j[celebrate_1.Segments.PARAMS] = {
        datainicio: celebrate_1.Joi.string().required(),
        datafim: celebrate_1.Joi.string().required(),
        idexame: celebrate_1.Joi.string().required()
    },
    _j)), exameAsoController.showExamesPeriodConsolidado);
exports.default = ExameAsoRouter;
