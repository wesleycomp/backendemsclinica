"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.AsosRepository = void 0;
var _typeorm = require("typeorm");
var _Aso = _interopRequireDefault(require("../entities/Aso"));
var _utils = _interopRequireDefault(require("../../../../config/utils"));
var _dec, _class;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const fs = require('fs');
let AsosRepository = exports.AsosRepository = (_dec = (0, _typeorm.EntityRepository)(_Aso.default), _dec(_class = class AsosRepository extends _typeorm.Repository {
  async findByName(name) {
    const aso = await this.findOne({
      where: {
        name
      }
    });
    return aso;
  }
  async findById(id) {
    const aso = await this.findOne(id, {
      relations: ['empresa', 'tipoaso', 'medico', 'medicoexaminador', 'paciente', 'tipopagamento']
    });
    return aso;
  }
  async findAllFichaExameById(id) {
    const aso = await this.findOne(id, {
      relations: ['empresa', 'tipoaso', 'medico', 'medicoexaminador', 'paciente', 'paciente.funcao', 'tipopagamento']
    });
    return aso;
  }
  async findAll() {
    const aso = await this.find({
      where: {
        ativo: true
      },
      relations: ['empresa', 'tipoaso', 'medico', 'medicoexaminador', 'paciente', 'paciente.funcao', 'tipopagamento'],
      order: {
        created_at: "DESC"
      }
    });
    //console.log(aso)
    return aso;
  }
  async searcNomeEmpresa(nomeEmpresa) {
    const aso = await this.find({
      where: {
        ativo: true,
        empresa: {
          nome: (0, _typeorm.Like)('%' + nomeEmpresa + '%')
        }
      },
      relations: ['empresa', 'tipoaso', 'medico', 'medicoexaminador', 'paciente', 'paciente.funcao', 'tipopagamento'],
      order: {
        created_at: "DESC"
      }
    });
    return aso;
  }
  async searcCnpjEmpresa(cnpj) {
    const aso = await this.find({
      where: {
        ativo: true,
        empresa: {
          cnpj: (0, _typeorm.Like)('%' + cnpj + '%')
        }
      },
      relations: ['empresa', 'tipoaso', 'medico', 'medicoexaminador', 'paciente', 'paciente.funcao', 'tipopagamento'],
      order: {
        created_at: "DESC"
      }
    });
    return aso;
  }
  async searcNomePaciente(nomePaciente) {
    const aso = await this.find({
      where: {
        ativo: true,
        paciente: {
          nome: (0, _typeorm.Like)('%' + nomePaciente + '%')
        }
      },
      relations: ['empresa', 'tipoaso', 'medico', 'medicoexaminador', 'paciente', 'paciente.funcao', 'tipopagamento'],
      order: {
        created_at: "DESC"
      }
    });
    return aso;
  }
  async searcCpfPaciente(cpf) {
    const aso = await this.find({
      where: {
        ativo: true,
        paciente: {
          cpf: (0, _typeorm.Like)('%' + cpf + '%')
        }
      },
      relations: ['empresa', 'tipoaso', 'medico', 'medicoexaminador', 'paciente', 'paciente.funcao', 'tipopagamento'],
      order: {
        created_at: "DESC"
      }
    });
    return aso;
  }
  async findHistoricoAsosCriadas() {
    const util = new _utils.default();
    var data = util.formatDate(new Date());
    const exameAso = await this.find({
      where: {
        data_criacao: data
      }
    });
    return exameAso;
  }
  async findRelatorioFechamentoPeriodo(datainicio, datafim) {
    const exameAso = await this.query("SELECT e.id,e.nome,e.cnpj,e.telefone FROM aso as a INNER JOIN empresa as e on a.empresa_id=e.id WHERE a.data_criacao BETWEEN '" + datainicio + "' AND '" + datafim + "'  GROUP BY e.id,e.nome,e.cnpj");
    return exameAso;
  }
  async findRelatorioFechamentoPeriodoEmpresaFora(datainicio, datafim, empresafora) {
    const exameAso = await this.query("SELECT e.id,e.nome,e.cnpj,e.telefone FROM aso as a INNER JOIN empresa as e on a.empresa_id=e.id WHERE a.data_criacao BETWEEN '" + datainicio + "' AND '" + datafim + "' AND e.empresafora='" + empresafora + "'  GROUP BY e.id,e.nome,e.cnpj");
    return exameAso;
  }
  async findRelatorioFechamentoPeriodoTipoPagamento(datainicio, datafim, tipopagamento) {
    const exameAso = await this.query("SELECT e.id,e.nome,e.cnpj,e.telefone FROM aso as a INNER JOIN empresa as e on a.empresa_id=e.id WHERE a.data_criacao BETWEEN '" + datainicio + "' AND '" + datafim + "' AND a.tipopagamento_id='" + tipopagamento + "'  GROUP BY e.id,e.nome,e.cnpj");
    return exameAso;
  }
  async findRelatorioFechamentoPeriodoEmpresa(datainicio, datafim, empresa) {
    const exameAso = await this.query("SELECT e.id,e.nome,e.cnpj,e.telefone FROM aso as a INNER JOIN empresa as e on a.empresa_id=e.id WHERE a.data_criacao BETWEEN '" + datainicio + "' AND '" + datafim + "' AND a.empresa_id='" + empresa + "'  GROUP BY e.id,e.nome,e.cnpj");
    return exameAso;
  }
  async findRelatorioFechamentoPeriodoEmpresaTipopagamento(datainicio, datafim, empresa, tipopagamento) {
    const exameAso = await this.query("SELECT e.id,e.nome,e.cnpj,e.telefone FROM aso as a INNER JOIN empresa as e on a.empresa_id=e.id WHERE a.data_criacao BETWEEN '" + datainicio + "' AND '" + datafim + "' AND a.empresa_id='" + empresa + "' AND a.tipopagamento_id='" + tipopagamento + "'  GROUP BY e.id,e.nome,e.cnpj");
    return exameAso;
  }
}) || _class);
var _default = exports.default = AsosRepository;