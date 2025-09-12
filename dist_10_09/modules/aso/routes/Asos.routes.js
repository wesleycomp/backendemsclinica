"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = require("express");
var _AsosController = _interopRequireDefault(require("../controllers/AsosController"));
var _celebrate = require("celebrate");
var _isAuthenticated = _interopRequireDefault(require("../../../shared/http/middlewares/isAuthenticated"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const AsoRouter = (0, _express.Router)();
const asoController = new _AsosController.default();
AsoRouter.get('/', _isAuthenticated.default, asoController.index);
AsoRouter.get('/listasosexcluidas/:datainicio/:datafim', _isAuthenticated.default, (0, _celebrate.celebrate)({
  [_celebrate.Segments.PARAMS]: {
    datainicio: _celebrate.Joi.string().required(),
    datafim: _celebrate.Joi.string().required()
  }
}), asoController.showAsosExcluidasPeriodo);
AsoRouter.get('/listasoseditadas/:datainicio/:datafim', _isAuthenticated.default, (0, _celebrate.celebrate)({
  [_celebrate.Segments.PARAMS]: {
    datainicio: _celebrate.Joi.string().required(),
    datafim: _celebrate.Joi.string().required()
  }
}), asoController.showAsosEditadasPeriodo);
AsoRouter.get('/search/asonomeempresa/:nomeempresa', _isAuthenticated.default, (0, _celebrate.celebrate)({
  [_celebrate.Segments.PARAMS]: {
    nomeempresa: _celebrate.Joi.string().uppercase().required()
  }
}), asoController.searcNomeEmpresaAso);
AsoRouter.get('/search/asocnpjempresa/:cnpj', _isAuthenticated.default, (0, _celebrate.celebrate)({
  [_celebrate.Segments.PARAMS]: {
    cnpj: _celebrate.Joi.string().required()
  }
}), asoController.searcCnpjEmpresaAso);
AsoRouter.get('/search/asonomepaciente/:nomepaciente', _isAuthenticated.default, (0, _celebrate.celebrate)({
  [_celebrate.Segments.PARAMS]: {
    nomepaciente: _celebrate.Joi.string().uppercase().required()
  }
}), asoController.searcNomePacienteAso);
AsoRouter.get('/search/asocpfpaciente/:cpf', _isAuthenticated.default, (0, _celebrate.celebrate)({
  [_celebrate.Segments.PARAMS]: {
    cpf: _celebrate.Joi.string().required()
  }
}), asoController.searcCpfPacienteAso);
AsoRouter.get('/:id', _isAuthenticated.default, (0, _celebrate.celebrate)({
  [_celebrate.Segments.PARAMS]: {
    id: _celebrate.Joi.string().uuid().required()
  }
}), asoController.show);
AsoRouter.get('/historico/asoseditadas', _isAuthenticated.default, asoController.showAsosEditadas);
AsoRouter.get('/historico/asoscriadas', _isAuthenticated.default, asoController.showAsosCriadas);
AsoRouter.get('/historico/asosexcluidas', _isAuthenticated.default, asoController.showAsosExcluidas);
AsoRouter.get('/fichaexame/:id', _isAuthenticated.default, (0, _celebrate.celebrate)({
  [_celebrate.Segments.PARAMS]: {
    id: _celebrate.Joi.string().uuid().required()
  }
}), asoController.showFichaExame);
AsoRouter.get('/xml/:aso_id', _isAuthenticated.default, (0, _celebrate.celebrate)({
  [_celebrate.Segments.PARAMS]: {
    aso_id: _celebrate.Joi.string().uuid().required()
  }
}), asoController.geraXML);
AsoRouter.get('/txt2/:aso_id', _isAuthenticated.default, (0, _celebrate.celebrate)({
  [_celebrate.Segments.PARAMS]: {
    aso_id: _celebrate.Joi.string().uuid().required()
  }
}), asoController.geraTXT2TecnoSpeed);
AsoRouter.post('/', _isAuthenticated.default, (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    dataemissaoaso: _celebrate.Joi.string().required(),
    paciente_id: _celebrate.Joi.string().required(),
    user_id: _celebrate.Joi.string().required(),
    empresa_id: _celebrate.Joi.string().required(),
    funcao_id: _celebrate.Joi.string().required(),
    tipoaso_id: _celebrate.Joi.string().required(),
    medico_id: _celebrate.Joi.string().required(),
    medicoexaminador_id: _celebrate.Joi.string().required(),
    resultado: _celebrate.Joi.string().allow('', null).default(''),
    user_edit: _celebrate.Joi.string().allow('', null).default(''),
    tipopagamento_id: _celebrate.Joi.string().required(),
    transmissaoesocial: _celebrate.Joi.boolean().allow('', null).default('false'),
    ativo: _celebrate.Joi.boolean().allow('', null).default(true),
    exameavulso: _celebrate.Joi.boolean().allow('', null).default('false')
  }
}), asoController.create);
AsoRouter.put('/:id', _isAuthenticated.default, (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    id: _celebrate.Joi.string().required(),
    dataemissaoaso: _celebrate.Joi.string().required(),
    paciente_id: _celebrate.Joi.string().required(),
    empresa_id: _celebrate.Joi.string().required(),
    funcao_id: _celebrate.Joi.string().required(),
    tipoaso_id: _celebrate.Joi.string().required(),
    user_edit: _celebrate.Joi.string().required(),
    tipopagamento_id: _celebrate.Joi.string().required(),
    medico_id: _celebrate.Joi.string().required(),
    medicoexaminador_id: _celebrate.Joi.string().required(),
    resultado: _celebrate.Joi.string().allow('', null).default(''),
    transmissaoesocial: _celebrate.Joi.boolean().required(),
    ativo: _celebrate.Joi.boolean().required(),
    created_at: _celebrate.Joi.string().required(),
    updated_at: _celebrate.Joi.string().required(),
    user_id: _celebrate.Joi.string().required(),
    motivo: _celebrate.Joi.string().required(),
    exameavulso: _celebrate.Joi.boolean().allow('', null).default('false')
  },
  [_celebrate.Segments.PARAMS]: {
    id: _celebrate.Joi.string().uuid().required()
  }
}), asoController.update);
AsoRouter.delete('/:id/:user_exclusao/:motivo', _isAuthenticated.default, (0, _celebrate.celebrate)({
  [_celebrate.Segments.PARAMS]: {
    id: _celebrate.Joi.string().uuid().required(),
    user_exclusao: _celebrate.Joi.string().required(),
    motivo: _celebrate.Joi.string().required()
  }
}), asoController.delete);
AsoRouter.get(
// '/relatoriofechamamento/:datainicio/:datafim/:tipopagamento/:usuario/:empresa/:empresafora',
'/relatoriofechamamento/:datainicio/:datafim/:empresa/:tipopagamento/:empresafora', _isAuthenticated.default, (0, _celebrate.celebrate)({
  [_celebrate.Segments.PARAMS]: {
    datainicio: _celebrate.Joi.string().required(),
    datafim: _celebrate.Joi.string().required(),
    empresa: _celebrate.Joi.string(),
    tipopagamento: _celebrate.Joi.string(),
    //   usuario: Joi.string(),
    empresafora: _celebrate.Joi.string()
  }
}), asoController.showRelatorioFechamento);

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
var _default = exports.default = AsoRouter;