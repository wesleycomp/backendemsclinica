"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var AsosController_1 = __importDefault(require("../controllers/AsosController"));
var celebrate_1 = require("celebrate");
var isAuthenticated_1 = __importDefault(require("../../../shared/http/middlewares/isAuthenticated"));
var AsoRouter = (0, express_1.Router)();
var asoController = new AsosController_1.default();
AsoRouter.get('/', isAuthenticated_1.default, asoController.index);
AsoRouter.get('/listasosexcluidas/:datainicio/:datafim', isAuthenticated_1.default, (0, celebrate_1.celebrate)((_a = {},
    _a[celebrate_1.Segments.PARAMS] = {
        datainicio: celebrate_1.Joi.string().required(),
        datafim: celebrate_1.Joi.string().required()
    },
    _a)), asoController.showAsosExcluidasPeriodo);
AsoRouter.get('/listasoseditadas/:datainicio/:datafim', isAuthenticated_1.default, (0, celebrate_1.celebrate)((_b = {},
    _b[celebrate_1.Segments.PARAMS] = {
        datainicio: celebrate_1.Joi.string().required(),
        datafim: celebrate_1.Joi.string().required()
    },
    _b)), asoController.showAsosEditadasPeriodo);
AsoRouter.get('/search/asonomeempresa/:nomeempresa', isAuthenticated_1.default, (0, celebrate_1.celebrate)((_c = {},
    _c[celebrate_1.Segments.PARAMS] = {
        nomeempresa: celebrate_1.Joi.string().uppercase().required()
    },
    _c)), asoController.searcNomeEmpresaAso);
AsoRouter.get('/search/asocnpjempresa/:cnpj', isAuthenticated_1.default, (0, celebrate_1.celebrate)((_d = {},
    _d[celebrate_1.Segments.PARAMS] = {
        cnpj: celebrate_1.Joi.string().required()
    },
    _d)), asoController.searcCnpjEmpresaAso);
AsoRouter.get('/search/asonomepaciente/:nomepaciente', isAuthenticated_1.default, (0, celebrate_1.celebrate)((_e = {},
    _e[celebrate_1.Segments.PARAMS] = {
        nomepaciente: celebrate_1.Joi.string().uppercase().required()
    },
    _e)), asoController.searcNomePacienteAso);
AsoRouter.get('/search/asocpfpaciente/:cpf', isAuthenticated_1.default, (0, celebrate_1.celebrate)((_f = {},
    _f[celebrate_1.Segments.PARAMS] = {
        cpf: celebrate_1.Joi.string().required()
    },
    _f)), asoController.searcCpfPacienteAso);
AsoRouter.get('/:id', isAuthenticated_1.default, (0, celebrate_1.celebrate)((_g = {},
    _g[celebrate_1.Segments.PARAMS] = {
        id: celebrate_1.Joi.string().uuid().required(),
    },
    _g)), asoController.show);
AsoRouter.get('/historico/asoseditadas', isAuthenticated_1.default, asoController.showAsosEditadas);
AsoRouter.get('/historico/asoscriadas', isAuthenticated_1.default, asoController.showAsosCriadas);
AsoRouter.get('/historico/asosexcluidas', isAuthenticated_1.default, asoController.showAsosExcluidas);
AsoRouter.get('/fichaexame/:id', isAuthenticated_1.default, (0, celebrate_1.celebrate)((_h = {},
    _h[celebrate_1.Segments.PARAMS] = {
        id: celebrate_1.Joi.string().uuid().required(),
    },
    _h)), asoController.showFichaExame);
AsoRouter.get('/xml/:aso_id', isAuthenticated_1.default, (0, celebrate_1.celebrate)((_j = {},
    _j[celebrate_1.Segments.PARAMS] = {
        aso_id: celebrate_1.Joi.string().uuid().required(),
    },
    _j)), asoController.geraXML);
AsoRouter.get('/txt2/:aso_id', isAuthenticated_1.default, (0, celebrate_1.celebrate)((_k = {},
    _k[celebrate_1.Segments.PARAMS] = {
        aso_id: celebrate_1.Joi.string().uuid().required(),
    },
    _k)), asoController.geraTXT2TecnoSpeed);
AsoRouter.post('/', isAuthenticated_1.default, (0, celebrate_1.celebrate)((_l = {},
    _l[celebrate_1.Segments.BODY] = {
        dataemissaoaso: celebrate_1.Joi.string().required(),
        paciente_id: celebrate_1.Joi.string().required(),
        user_id: celebrate_1.Joi.string().required(),
        empresa_id: celebrate_1.Joi.string().required(),
        funcao_id: celebrate_1.Joi.string().required(),
        tipoaso_id: celebrate_1.Joi.string().required(),
        medico_id: celebrate_1.Joi.string().required(),
        medicoexaminador_id: celebrate_1.Joi.string().required(),
        resultado: celebrate_1.Joi.string().allow('', null).default(''),
        user_edit: celebrate_1.Joi.string().allow('', null).default(''),
        tipopagamento_id: celebrate_1.Joi.string().required(),
        transmissaoesocial: celebrate_1.Joi.boolean().allow('', null).default('false'),
        ativo: celebrate_1.Joi.boolean().allow('', null).default(true),
        exameavulso: celebrate_1.Joi.boolean().allow('', null).default('false')
    },
    _l)), asoController.create);
AsoRouter.put('/:id', isAuthenticated_1.default, (0, celebrate_1.celebrate)((_m = {},
    _m[celebrate_1.Segments.BODY] = {
        id: celebrate_1.Joi.string().required(),
        dataemissaoaso: celebrate_1.Joi.string().required(),
        paciente_id: celebrate_1.Joi.string().required(),
        empresa_id: celebrate_1.Joi.string().required(),
        funcao_id: celebrate_1.Joi.string().required(),
        tipoaso_id: celebrate_1.Joi.string().required(),
        user_edit: celebrate_1.Joi.string().required(),
        tipopagamento_id: celebrate_1.Joi.string().required(),
        medico_id: celebrate_1.Joi.string().required(),
        medicoexaminador_id: celebrate_1.Joi.string().required(),
        resultado: celebrate_1.Joi.string().allow('', null).default(''),
        transmissaoesocial: celebrate_1.Joi.boolean().required(),
        ativo: celebrate_1.Joi.boolean().required(),
        created_at: celebrate_1.Joi.string().required(),
        updated_at: celebrate_1.Joi.string().required(),
        user_id: celebrate_1.Joi.string().required(),
        motivo: celebrate_1.Joi.string().required(),
        exameavulso: celebrate_1.Joi.boolean().allow('', null).default('false')
    },
    _m[celebrate_1.Segments.PARAMS] = {
        id: celebrate_1.Joi.string().uuid().required(),
    },
    _m)), asoController.update);
AsoRouter.delete('/:id/:user_exclusao/:motivo', isAuthenticated_1.default, (0, celebrate_1.celebrate)((_o = {},
    _o[celebrate_1.Segments.PARAMS] = {
        id: celebrate_1.Joi.string().uuid().required(),
        user_exclusao: celebrate_1.Joi.string().required(),
        motivo: celebrate_1.Joi.string().required()
    },
    _o)), asoController.delete);
AsoRouter.get(
// '/relatoriofechamamento/:datainicio/:datafim/:tipopagamento/:usuario/:empresa/:empresafora',
'/relatoriofechamamento/:datainicio/:datafim/:empresa/:tipopagamento/:empresafora', isAuthenticated_1.default, (0, celebrate_1.celebrate)((_p = {},
    _p[celebrate_1.Segments.PARAMS] = {
        datainicio: celebrate_1.Joi.string().required(),
        datafim: celebrate_1.Joi.string().required(),
        empresa: celebrate_1.Joi.string(),
        tipopagamento: celebrate_1.Joi.string(),
        //   usuario: Joi.string(),
        empresafora: celebrate_1.Joi.string()
    },
    _p)), asoController.showRelatorioFechamento);
/*
AsoRouter.post(
                    '/asoexcluida/cadastrar',
                    isAuthenticated,
                    celebrate({
                        [Segments.BODY]:{
                            aso_id:Joi.string().required(),
                            user_id:Joi.string().required(),
                            motivo:Joi.string().required()
                        },
                    }),
                    asoController.createAsosExcluidas
                )
*/
exports.default = AsoRouter;
