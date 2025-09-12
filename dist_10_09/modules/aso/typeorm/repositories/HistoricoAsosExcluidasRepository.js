"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.HistoricoAsosExcluidasRepository = void 0;
var _typeorm = require("typeorm");
var _utils = _interopRequireDefault(require("../../../../config/utils"));
var _HistoricoAsoExcluida = _interopRequireDefault(require("../entities/HistoricoAsoExcluida"));
var _dec, _class;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const fs = require('fs');
let HistoricoAsosExcluidasRepository = exports.HistoricoAsosExcluidasRepository = (_dec = (0, _typeorm.EntityRepository)(_HistoricoAsoExcluida.default), _dec(_class = class HistoricoAsosExcluidasRepository extends _typeorm.Repository {
  async findHistoricoAsosExcluidas() {
    const util = new _utils.default();
    var data = util.formatDate(new Date());
    const exameAso = await this.find({
      where: {
        data_exclusao: data
      },
      relations: ['empresa', 'paciente', 'tipopagamento', 'user']
    });
    return exameAso;
  }
  async findAsosExcluidasPeriodo(datainicio, datafim) {
    //console.log('chegou akiiiiii')
    const exameAso = await this.find({
      where: {
        data_exclusao: (0, _typeorm.Between)(datainicio, datafim)
      }
    });
    return exameAso;
  }
}) || _class);
var _default = exports.default = HistoricoAsosExcluidasRepository;