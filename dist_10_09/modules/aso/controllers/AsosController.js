"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _CreateAsosService = _interopRequireDefault(require("../services/CreateAsosService"));
var _CreateXMLService = _interopRequireDefault(require("../services/CreateXMLService"));
var _CreateTxt2Tecnospeed = _interopRequireDefault(require("../services/CreateTxt2Tecnospeed"));
var _DeleteAsosService = _interopRequireDefault(require("../services/DeleteAsosService"));
var _ListAsosService = _interopRequireDefault(require("../services/ListAsosService"));
var _ShowAsosService = _interopRequireDefault(require("../services/ShowAsosService"));
var _ShowFichaExameService = _interopRequireDefault(require("../services/ShowFichaExameService"));
var _UpdateAsosService = _interopRequireDefault(require("../services/UpdateAsosService"));
var _DeleteExameAsoService = _interopRequireDefault(require("../services/DeleteExameAsoService"));
var _DeleteFichaClinicaService = _interopRequireDefault(require("../../fichaclinica/services/DeleteFichaClinicaService"));
var _ShowHistoricoEdicaoAsoService = _interopRequireDefault(require("../services/ShowHistoricoEdicaoAsoService"));
var _CreateHistoricoAsoExcluidaService = _interopRequireDefault(require("../services/CreateHistoricoAsoExcluidaService"));
var _ShowExamesAsosService = _interopRequireDefault(require("../services/ShowExamesAsosService"));
var _CreatehistoricoExameAsoExcluidoService = _interopRequireDefault(require("../services/CreatehistoricoExameAsoExcluidoService"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class AsosController {
  async index(request, response) {
    const listExame = new _ListAsosService.default();
    const exame = await listExame.execute();
    return response.json(exame);
  }
  async showAsosExcluidasPeriodo(request, response) {
    const {
      datainicio
    } = request.params;
    const {
      datafim
    } = request.params;
    const showExameAso = new _ShowExamesAsosService.default();
    const exame = await showExameAso.executeAsosExlcuidasPeriodo(datainicio, datafim);
    return response.json(exame);
  }
  async showAsosEditadasPeriodo(request, response) {
    const {
      datainicio
    } = request.params;
    const {
      datafim
    } = request.params;
    const showExameAso = new _ShowExamesAsosService.default();
    const exame = await showExameAso.executeAsosEditadasPeriodo(datainicio, datafim);
    return response.json(exame);
  }
  async searcNomeEmpresaAso(request, response) {
    const {
      nomeempresa
    } = request.params;
    const listAsos = new _ListAsosService.default();
    const asos = await listAsos.pesquisaAsoNomeEmpresa(nomeempresa);
    return response.json(asos);
  }
  async searcCnpjEmpresaAso(request, response) {
    const {
      cnpj
    } = request.params;
    const listAsos = new _ListAsosService.default();
    const asos = await listAsos.pesquisaAsoCnpjEmpresa(cnpj);
    return response.json(asos);
  }
  async searcNomePacienteAso(request, response) {
    const {
      nomepaciente
    } = request.params;
    const listAsos = new _ListAsosService.default();
    const asos = await listAsos.pesquisaAsoNomePaciente(nomepaciente);
    return response.json(asos);
  }
  async searcCpfPacienteAso(request, response) {
    const {
      cpf
    } = request.params;
    const listAsos = new _ListAsosService.default();
    const asos = await listAsos.pesquisaAsoCpfPaciente(cpf);
    return response.json(asos);
  }
  async show(request, response) {
    const {
      id
    } = request.params;
    const showExame = new _ShowAsosService.default();
    const exame = await showExame.execute({
      id
    });
    return response.json(exame);
  }
  async showFichaExame(request, response) {
    const {
      id
    } = request.params;
    const showExame = new _ShowFichaExameService.default();
    const exame = await showExame.execute({
      id
    });
    return response.json(exame);
  }
  async geraXML(request, response) {
    const {
      aso_id
    } = request.params;
    const geraXml = new _CreateXMLService.default();
    const xml = await geraXml.execute({
      aso_id
    });
    return response.json(xml);
  }
  async geraTXT2TecnoSpeed(request, response) {
    const {
      aso_id
    } = request.params;
    const geraXml = new _CreateTxt2Tecnospeed.default();
    const xml = await geraXml.execute({
      aso_id
    });
    return response.json(xml);
  }
  async create(request, response) {
    const {
      dataemissaoaso,
      paciente_id,
      empresa_id,
      funcao_id,
      tipoaso_id,
      medico_id,
      medicoexaminador_id,
      resultado,
      user_edit,
      tipopagamento_id,
      transmissaoesocial,
      ativo,
      user_id
    } = request.body;
    const createExame = new _CreateAsosService.default();
    const exame = await createExame.execute({
      dataemissaoaso,
      paciente_id,
      empresa_id,
      funcao_id,
      tipoaso_id,
      medico_id,
      medicoexaminador_id,
      resultado,
      user_edit,
      tipopagamento_id,
      transmissaoesocial,
      ativo,
      user_id
    });
    return response.json(exame);
  }
  async update(request, response) {
    const {
      dataemissaoaso,
      paciente_id,
      empresa_id,
      funcao_id,
      tipoaso_id,
      medico_id,
      medicoexaminador_id,
      resultado,
      user_edit,
      tipopagamento_id,
      transmissaoesocial,
      ativo,
      user_id,
      motivo
    } = request.body;
    const {
      id
    } = request.params;
    const updateExame = new _UpdateAsosService.default();
    const exame = await updateExame.execute({
      id,
      dataemissaoaso,
      paciente_id,
      empresa_id,
      funcao_id,
      tipoaso_id,
      medico_id,
      medicoexaminador_id,
      resultado,
      user_edit,
      tipopagamento_id,
      transmissaoesocial,
      ativo,
      user_id,
      motivo
    });
    return response.json(exame);
  }
  async delete(request, response) {
    const {
      id,
      user_exclusao,
      motivo
    } = request.params;
    const deleteExamesAso = new _DeleteExameAsoService.default();
    const deleteAso = new _DeleteAsosService.default();
    const deleteFichaClinicaAso = new _DeleteFichaClinicaService.default();
    const asoService = new _ShowAsosService.default();
    const historicoAsosExcluidasService = new _CreateHistoricoAsoExcluidaService.default();
    const historicoExameAsoExcluidaService = new _CreatehistoricoExameAsoExcluidoService.default();
    const aso = await asoService.execute({
      id
    });
    const asoExameAsoService = new _ShowExamesAsosService.default();
    const aso_id = aso.id;
    const exameAso = await asoExameAsoService.execute({
      aso_id
    });

    //popula o objeto com os dados dos exames aso a ser excluida em um laco FOR
    exameAso.forEach(item => {
      var aso_id = item.aso_id;
      var exame_id = item.exame_id;
      var ativo = item.ativo;
      var created_at = item.created_at;
      var updated_at = item.updated_at;
      var valorexamesemdesconto = item.valorexamesemdesconto;
      var valorexame = item.valorexame;
      var valormedico = item.valormedico;
      var valorems = item.valorems;
      var tipopagamento_id = item.tipopagamento_id;
      var user_id = item.user_id;
      var user_desconto = item.user_desconto;
      var desconto = item.desconto;

      //guarda os dados dos exames da ASO a sereme excluidos na tabela historico__exameaso_excluido
      historicoExameAsoExcluidaService.execute({
        aso_id,
        exame_id,
        ativo,
        created_at,
        updated_at,
        valorexamesemdesconto,
        valorexame,
        valormedico,
        valorems,
        tipopagamento_id,
        user_id,
        user_desconto,
        desconto
      });
    });

    //popula o objeto com os dados da aso a ser excluida
    const dataemissaoaso = aso.dataemissaoaso;
    const paciente_id = aso.paciente_id;
    const empresa_id = aso.empresa_id;
    const funcao_id = aso.funcao_id;
    const tipoaso_id = aso.tipoaso_id;
    const medico_id = aso.medico_id;
    const medicoexaminador_id = aso.medicoexaminador_id;
    const resultado = aso.resultado;
    const transmissaoesocial = aso.transmissaoesocial;
    const ativo = aso.ativo;
    const created_at = aso.created_at;
    const updated_at = aso.updated_at;
    const user_id = aso.user_id;
    const user_edit = aso.user_edit;
    const codigoaso = aso.codigoaso;
    const tipopagamento_id = aso.tipopagamento_id;
    const data_criacao = aso.data_criacao;

    //guarda os dados da aso a ser  excluida na tabela historico_aso_excluida
    await historicoAsosExcluidasService.execute({
      aso_id,
      dataemissaoaso,
      paciente_id,
      empresa_id,
      funcao_id,
      tipoaso_id,
      medico_id,
      medicoexaminador_id,
      resultado,
      transmissaoesocial,
      ativo,
      created_at,
      updated_at,
      user_id,
      user_edit,
      codigoaso,
      tipopagamento_id,
      data_criacao,
      user_exclusao,
      motivo
    });
    await deleteExamesAso.deleteExameAso({
      id
    }); // corrigi
    await deleteFichaClinicaAso.execute({
      id
    });
    await deleteAso.execute({
      id,
      user_exclusao
    });
    return response.json([]);
  }
  async showAsosEditadas(request, response) {
    const showAsosEditadas = new _ShowHistoricoEdicaoAsoService.default();
    const asosEditadas = await showAsosEditadas.listAsosEditadas();
    return response.json(asosEditadas);
  }
  async showAsosCriadas(request, response) {
    const showAsosCriadas = new _ShowAsosService.default();
    const asosCriadas = await showAsosCriadas.listAsosCriadas();
    return response.json(asosCriadas);
  }
  async showAsosExcluidas(request, response) {
    const showAsosExcluidas = new _ShowAsosService.default();
    const asosExcluidas = await showAsosExcluidas.listAsosExcluidas();
    return response.json(asosExcluidas);
  }
  async showRelatorioFechamento(request, response) {
    const {
      datainicio
    } = request.params;
    const {
      datafim
    } = request.params;
    const {
      tipopagamento
    } = request.params;
    //const { usuario } = request.params;
    const {
      empresa
    } = request.params;
    const {
      empresafora
    } = request.params;
    const showExameAso = new _ShowAsosService.default();
    const exame = await showExameAso.executeRelatorioFechamento({
      datainicio,
      datafim,
      empresa,
      tipopagamento,
      empresafora
    });
    return response.json(exame);
  }

  /*
  
         public async createAsosExcluidas(request: Request, response: Response): Promise<Response>{
  
          const {aso_id,user_id,motivo} = request.body;
          const createAsoExcluida = new CreateAsosExcluidasServices();
          const asoExcluida = await createAsoExcluida.execute({
              aso_id,
              user_id,
              motivo
          });
  
          return response.json(asoExcluida);
      }
  */
}
exports.default = AsosController;