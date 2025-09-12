"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _CreateExameAsoService = _interopRequireDefault(require("../services/CreateExameAsoService"));
var _UpdateExameAsoService = _interopRequireDefault(require("../services/UpdateExameAsoService"));
var _ListExamesAsoService = _interopRequireDefault(require("../services/ListExamesAsoService"));
var _ShowExamesAsosService = _interopRequireDefault(require("../services/ShowExamesAsosService"));
var _CreateHistoricoExclusaoExameAsoService = _interopRequireDefault(require("../services/CreateHistoricoExclusaoExameAsoService"));
var _ShowAsosService = _interopRequireDefault(require("../services/ShowAsosService"));
var _DeleteExameAsoService = _interopRequireDefault(require("../services/DeleteExameAsoService"));
var _utils = _interopRequireDefault(require("../../../config/utils"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
//teste git
class ExameAsoController {
  async index(request, response) {
    const listExamesAso = new _ListExamesAsoService.default();
    const examesAso = await listExamesAso.execute();
    return response.json(examesAso);
  }
  async showExamesPeriodo(request, response) {
    const {
      datainicio
    } = request.params;
    const {
      datafim
    } = request.params;
    const {
      tipopagamento
    } = request.params;
    const {
      usuario
    } = request.params;
    const {
      empresa
    } = request.params;
    const {
      empresafora
    } = request.params;
    const showExameAso = new _ShowExamesAsosService.default();
    const exame = await showExameAso.executeExamesPeriodo({
      datainicio,
      datafim,
      tipopagamento,
      usuario,
      empresa,
      empresafora
    });
    return response.json(exame);
  }
  async showExamesPeriodConsolidado(request, response) {
    const {
      datainicio
    } = request.params;
    const {
      datafim
    } = request.params;
    const {
      idexame
    } = request.params;
    const showExameAso = new _ShowExamesAsosService.default();
    const exame = await showExameAso.executeExamesPeriodoConsolidado({
      datainicio,
      datafim,
      idexame
    });
    return response.json(exame);
  }
  async showRelatorioFechamentoEmpresa(request, response) {
    const {
      datainicio
    } = request.params;
    const {
      datafim
    } = request.params;
    const {
      tipopagamento
    } = request.params;
    const {
      empresa
    } = request.params;
    const showExameAso = new _ShowExamesAsosService.default();
    const exame = await showExameAso.executeRelatorioFechamentoEmpresa({
      datainicio,
      datafim,
      empresa,
      tipopagamento
    });
    return response.json(exame);
  }
  async showExames(request, response) {
    const showExameAso = new _ShowExamesAsosService.default();
    const exame = await showExameAso.executeExames();
    return response.json(exame);
  }
  async show(request, response) {
    const {
      aso_id
    } = request.params;
    const showExameAso = new _ShowExamesAsosService.default();
    const exame = await showExameAso.execute({
      aso_id
    });
    return response.json(exame);
  }
  async showAsoValores(request, response) {
    const {
      aso_id
    } = request.params;
    const showExameAso = new _ShowExamesAsosService.default();
    const exame = await showExameAso.executeValoresAso({
      aso_id
    });
    return response.json(exame);
  }
  async create(request, response) {
    const {
      aso_id,
      exame_id,
      valorexame,
      valormedico,
      valorems,
      ativo,
      tipopagamento_id,
      user_id
    } = request.body;
    const createExame = new _CreateExameAsoService.default();
    const exame = await createExame.execute({
      aso_id,
      exame_id,
      valorexame,
      valormedico,
      valorems,
      ativo,
      tipopagamento_id,
      user_id
    });
    return response.json(exame);
  }
  async update(request, response) {
    const {
      desconto,
      valorexamesemdesconto,
      user_desconto
    } = request.body;
    const {
      id
    } = request.params;
    const updateExame = new _UpdateExameAsoService.default();
    const exame = await updateExame.execute({
      id,
      desconto,
      valorexamesemdesconto,
      user_desconto
    });
    return response.json(exame);
  }
  async delete(request, response) {
    const {
      id,
      usuario_id
    } = request.params;
    const util = new _utils.default();
    var created_at = util.formatDate(new Date());

    //PESQUISANDO na TABELA  EXAMEASO
    const exameAsoRepository = new _ShowExamesAsosService.default();
    const exameaso = await exameAsoRepository.findExameAso({
      id
    });
    const aso_id = exameaso.aso_id;
    const exame_id = exameaso.exame_id;
    const tipopagamento_id = exameaso.tipopagamento_id;

    //PESQUISANDO AGORA A ASO
    const asoRepository = new _ShowAsosService.default();
    const aso = await asoRepository.findAso({
      aso_id
    });
    const paciente_id = aso.paciente_id;
    const empresa_id = aso.empresa_id;
    const funcao_id = aso.funcao_id;
    const historioExclusaoExameAso = new _CreateHistoricoExclusaoExameAsoService.default();
    const historicoExclusaoExame = await historioExclusaoExameAso.execute({
      aso_id,
      exame_id,
      tipopagamento_id,
      paciente_id,
      empresa_id,
      funcao_id,
      usuario_id,
      created_at
    });
    const deleteExameAso = new _DeleteExameAsoService.default();
    await deleteExameAso.execute({
      id
    });
    return response.json(historicoExclusaoExame);
  }
  async showExameAsoExcluidas(request, response) {
    const showExameAsoExcluida = new _ShowExamesAsosService.default();
    const examesAsosExcluidas = await showExameAsoExcluida.listExamesAsoExluidas();
    return response.json(examesAsosExcluidas);
  }
  async showFechamentoMedicoExames(request, response) {
    const {
      medico_id
    } = request.params;
    const {
      datainicio
    } = request.params;
    const {
      datafim
    } = request.params;
    const {
      exame_id
    } = request.params;
    const showFechamentoMedico = new _ShowExamesAsosService.default();
    const fechamentoMedico = await showFechamentoMedico.executeFechamentoMedicoExames({
      datainicio,
      datafim,
      medico_id,
      exame_id
    });
    return response.json(fechamentoMedico);
  }
}
exports.default = ExameAsoController;