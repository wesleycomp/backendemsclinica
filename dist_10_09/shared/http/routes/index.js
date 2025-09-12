"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _Funcao = _interopRequireDefault(require("../../../modules/funcao/routes/Funcao.routes"));
var _Pacientes = _interopRequireDefault(require("../../../modules/paciente/routes/Pacientes.routes"));
var _Empresa = _interopRequireDefault(require("../../../modules/empresa/routes/Empresa.routes"));
var _Procedimentos = _interopRequireDefault(require("../../../modules/procedimentos/routes/Procedimentos.routes"));
var _password = _interopRequireDefault(require("../../../modules/users/routes/password.routes"));
var _profile = _interopRequireDefault(require("../../../modules/users/routes/profile.routes"));
var _sessions = _interopRequireDefault(require("../../../modules/users/routes/sessions.routes"));
var _users = _interopRequireDefault(require("../../../modules/users/routes/users.routes"));
var _Exame = _interopRequireDefault(require("../../../modules/exame/routes/Exame.routes"));
var _express = require("express");
var _ConvenioEmpresa = _interopRequireDefault(require("../../../modules/convenioempresa/routes/ConvenioEmpresa.routes"));
var _CategoriaTrabalhadores = _interopRequireDefault(require("../../../modules/categoriaTrabalhadores/routes/CategoriaTrabalhadores.routes"));
var _Nacionalidade = _interopRequireDefault(require("../../../modules/nacionalidade/routes/Nacionalidade.routes"));
var _TipoAso = _interopRequireDefault(require("../../../modules/tipoaso/routes/TipoAso.routes"));
var _Medicos = _interopRequireDefault(require("../../../modules/medico/routes/Medicos.routes"));
var _TipoPagamento = _interopRequireDefault(require("../../../modules/tipopagamento/routes/TipoPagamento.routes"));
var _Asos = _interopRequireDefault(require("../../../modules/aso/routes/Asos.routes"));
var _ExameAso = _interopRequireDefault(require("../../../modules/aso/routes/ExameAso.routes"));
var _FichaClinica = _interopRequireDefault(require("../../../modules/fichaclinica/routes/FichaClinica.routes"));
var _Financeiro = _interopRequireDefault(require("../../../modules/financeiro/routes/Financeiro.routes"));
var _MedicoExaminador = _interopRequireDefault(require("../../../modules/medicoexaminador/routes/MedicoExaminador.routes"));
var _CentroCusto = _interopRequireDefault(require("../../../modules/centroCusto/routes/CentroCusto.routes"));
var _CategoriaDespesa = _interopRequireDefault(require("../../../modules/categoriaDespesa/routes/CategoriaDespesa.routes"));
var _Despesa = _interopRequireDefault(require("../../../modules/despesas/routes/Despesa.routes"));
var _DespesaParcela = _interopRequireDefault(require("../../../modules/despesas/routes/DespesaParcela.routes"));
var _Fornecedores = _interopRequireDefault(require("../../../modules/fornecedor/routes/Fornecedores.routes"));
var _ContaBancaria = _interopRequireDefault(require("../../../modules/contabancaria/routes/ContaBancaria.routes"));
var _fechamentos = _interopRequireDefault(require("../../../modules/fechamento/routes/fechamentos.routes"));
var _dashboard = _interopRequireDefault(require("../../../modules/dashboard/routes/dashboard.routes"));
var _relatorios = _interopRequireDefault(require("../../../modules/relatorios/routes/relatorios.routes"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const routes = (0, _express.Router)();
routes.use('/relatorios', _relatorios.default);
routes.use('/dashboard', _dashboard.default);
routes.use('/conta-bancaria', _ContaBancaria.default);
routes.use('/fornecedor', _Fornecedores.default);
routes.use('/fechamentos', _fechamentos.default);
routes.use('/centro-custo', _CentroCusto.default);
routes.use('/categoria-despesa', _CategoriaDespesa.default);
routes.use('/despesas', _Despesa.default);
routes.use('/despesa-parcelas', _DespesaParcela.default);
routes.use('/empresa', _Empresa.default);
routes.use('/funcao', _Funcao.default);
routes.use('/user', _users.default);
routes.use('/sessions', _sessions.default);
routes.use('/password', _password.default);
routes.use('/profile', _profile.default);
routes.use('/paciente', _Pacientes.default);
routes.use('/exame', _Exame.default);
routes.use('/procedimentos', _Procedimentos.default);
routes.use('/convenioempresa', _ConvenioEmpresa.default);
routes.use('/categoriatrabalhador', _CategoriaTrabalhadores.default);
routes.use('/nacionalidade', _Nacionalidade.default);
routes.use('/tipoaso', _TipoAso.default);
routes.use('/tipopagamento', _TipoPagamento.default);
routes.use('/medico', _Medicos.default);
routes.use('/aso', _Asos.default);
routes.use('/examesaso', _ExameAso.default);
routes.use('/fichaclinica', _FichaClinica.default);
routes.use('/financeiro', _Financeiro.default);
routes.use('/medicoexaminador', _MedicoExaminador.default);
routes.use('/', (request, response) => {
  return response.json({
    message: 'Hello Dev'
  });
});
var _default = exports.default = routes;