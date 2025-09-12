"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ExamesAsoRepository = void 0;
var _typeorm = require("typeorm");
var _ExamesAso = _interopRequireDefault(require("../entities/ExamesAso"));
var _dec, _class;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
let ExamesAsoRepository = exports.ExamesAsoRepository = (_dec = (0, _typeorm.EntityRepository)(_ExamesAso.default), _dec(_class = class ExamesAsoRepository extends _typeorm.Repository {
  async findByName(name) {
    const exameAso = await this.findOne({
      where: {
        name
      }
    });
    return exameAso;
  }
  async findById(id) {
    const exameAso = await this.findOne(id, {
      relations: ['exame', 'aso', 'aso.empresa', 'aso.paciente', 'aso.medico', 'aso.medicoexaminador', 'aso.funcao', 'aso.tipoaso', 'aso.tipopagamento']
    });
    return exameAso;
  }
  async findByExameAso(id) {
    const exameAso = await this.find({
      where: {
        id: id
      },
      relations: ['exame', 'exame.procedimento']
    });
    return exameAso;
  }
  async findExamesByAso(aso_id) {
    const exameAso = await this.find({
      where: {
        aso_id: aso_id
      },
      relations: ['exame', 'exame.procedimento']
    });
    return exameAso;
  }
  async findExamesAso(aso_id) {
    const exameAso = await this.find({
      where: {
        aso_id: aso_id
      }
    });
    return exameAso;
  }
  async findExamesRealizadosPeriodo(datainicio, datafim) {
    // console.log('chegou akiiiiii')
    const exameAso = await this.find({
      where: {
        data_cadastro_exame: (0, _typeorm.Between)(datainicio, datafim)
      },
      relations: ['exame', 'aso', 'aso.empresa', 'aso.paciente', 'aso.medico', 'aso.medicoexaminador', 'aso.funcao', 'aso.tipoaso', 'aso.tipopagamento', 'aso.user']
    });
    return exameAso;
  }
  async findExamesRealizadosPeriodoTipoPagamento(datainicio, datafim, tipopagamento) {
    const exameAso = await this.find({
      where: {
        data_cadastro_exame: (0, _typeorm.Between)(datainicio, datafim),
        tipopagamento_id: tipopagamento
      },
      relations: ['exame', 'aso', 'aso.empresa', 'aso.paciente', 'aso.medico', 'aso.medicoexaminador', 'aso.funcao', 'aso.tipoaso', 'aso.tipopagamento', 'aso.user']
    });
    return exameAso;
  }
  async findExamesRealizadosPeriodoTipoPagamentoUsuario(datainicio, datafim, tipopagamento, usuario) {
    const exameAso = await this.find({
      where: {
        data_cadastro_exame: (0, _typeorm.Between)(datainicio, datafim),
        tipopagamento_id: tipopagamento,
        user_id: usuario
      },
      relations: ['exame', 'aso', 'aso.empresa', 'aso.paciente', 'aso.medico', 'aso.medicoexaminador', 'aso.funcao', 'aso.tipoaso', 'aso.tipopagamento', 'aso.user']
    });
    return exameAso;
  }
  async findExamesRealizadosPeriodoUsuario(datainicio, datafim, usuario) {
    const exameAso = await this.find({
      where: {
        data_cadastro_exame: (0, _typeorm.Between)(datainicio, datafim),
        user_id: usuario
      },
      relations: ['exame', 'aso', 'aso.empresa', 'aso.paciente', 'aso.medico', 'aso.medicoexaminador', 'aso.funcao', 'aso.tipoaso', 'aso.tipopagamento', 'aso.user']
    });
    return exameAso;
  }
  async findExamesRealizadosPeriodoEmpresa(datainicio, datafim, empresa) {
    const exameAso = await this.find({
      where: {
        data_cadastro_exame: (0, _typeorm.Between)(datainicio, datafim),
        aso: {
          empresa_id: empresa
        }
      },
      relations: ['exame', 'aso', 'aso.empresa', 'aso.paciente', 'aso.medico', 'aso.medicoexaminador', 'aso.funcao', 'aso.tipoaso', 'aso.tipopagamento', 'aso.user']
    });
    return exameAso;
  }
  async findExamesRealizadosPeriodoEmpresaTipoPagamento(datainicio, datafim, empresa, tipopagamento) {
    const exameAso = await this.find({
      where: {
        data_cadastro_exame: (0, _typeorm.Between)(datainicio, datafim),
        aso: {
          empresa_id: empresa
        },
        tipopagamento_id: tipopagamento
      },
      relations: ['exame', 'aso', 'aso.empresa', 'aso.paciente', 'aso.medico', 'aso.medicoexaminador', 'aso.funcao', 'aso.tipoaso', 'aso.tipopagamento', 'aso.user']
    });
    return exameAso;
  }
  async findExamesRealizadosPeriodoEmpresaFora(datainicio, datafim, empresa, tipopagamento) {
    const sim = 'sim';
    const exameAso = await this.find({
      where: {
        data_cadastro_exame: (0, _typeorm.Between)(datainicio, datafim),
        aso: {
          empresa: {
            empresafora: sim
          }
        }
      },
      relations: ['exame', 'aso', 'aso.empresa', 'aso.paciente', 'aso.medico', 'aso.medicoexaminador', 'aso.funcao', 'aso.tipoaso', 'aso.tipopagamento', 'aso.user']
    });
    return exameAso;
  }
  async findExamesRealizadosPeriodoEmpresaForaNao(datainicio, datafim, empresa, tipopagamento) {
    const nao = 'nao';
    const exameAso = await this.find({
      where: {
        data_cadastro_exame: (0, _typeorm.Between)(datainicio, datafim),
        aso: {
          empresa: {
            empresafora: nao
          }
        }
      },
      relations: ['exame', 'aso', 'aso.empresa', 'aso.paciente', 'aso.medico', 'aso.medicoexaminador', 'aso.funcao', 'aso.tipoaso', 'aso.tipopagamento', 'aso.user']
    });
    return exameAso;
  }
  async findExamesRealizados() {
    const exameAso = await this.find({
      // relations: ['exameaso','exameaso.aso','exameaso.aso.empresa','exameaso.aso.paciente','exameaso.aso.medico','exameaso.aso.funcao','exameaso.aso.tipoaso','exameaso.aso.tipopagamento']
      relations: ['exameaso']
    });
    return exameAso;
  }
  async findByAso(aso_id) {
    const exameAso = await this.find({
      where: {
        aso_id: aso_id
      },
      relations: ['exame', 'exame.procedimento']
    });
    return exameAso;
  }
  async findByAsoAll(aso_id) {
    const exameAso = await this.find({
      where: {
        aso_id: aso_id
      },
      relations: ['aso', 'exame', 'aso.empresa', 'aso.paciente']
    });
    return exameAso;
  }
  async findRelatorioFechamentoPeriodoEmpresa(datainicio, datafim, empresa) {
    const exameAso = await this.find({
      where: {
        data_cadastro_exame: (0, _typeorm.Between)(datainicio, datafim),
        aso: {
          empresa_id: empresa
        }
      },
      relations: ['exame', 'aso', 'aso.empresa', 'aso.paciente', 'aso.medico', 'aso.medicoexaminador', 'aso.funcao', 'aso.tipoaso', 'aso.tipopagamento', 'aso.user']
    });
    return exameAso;
  }
  async findRelatorioFechamentoPeriodoEmpresaTipoPagamento(datainicio, datafim, empresa, tipopagamento) {
    const exameAso = await this.find({
      where: {
        data_cadastro_exame: (0, _typeorm.Between)(datainicio, datafim),
        aso: {
          empresa_id: empresa
        },
        tipopagamento_id: tipopagamento
      },
      relations: ['exame', 'aso', 'aso.empresa', 'aso.paciente', 'aso.medico', 'aso.medicoexaminador', 'aso.funcao', 'aso.tipoaso', 'aso.tipopagamento', 'aso.user']
    });
    return exameAso;
  }
  async findByMedicoFechamentoExames(datainicio, datafim, idmedico, idexame) {
    const exameAso = await this.find({
      where: {
        data_cadastro_exame: (0, _typeorm.Between)(datainicio, datafim),
        aso: {
          medico_id: idmedico
        },
        exame_id: idexame
      },
      relations: ['exame', 'aso']
    });
    return exameAso;
  }
  async findExamesRealizadosPeriodoConsolidado(datainicio, datafim, idexame) {
    const exameAso = await this.find({
      where: {
        data_cadastro_exame: (0, _typeorm.Between)(datainicio, datafim),
        exame_id: idexame
      },
      relations: ['exame', 'aso']
    });
    return exameAso;
  }
}) || _class);
var _default = exports.default = ExamesAsoRepository;