"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.HistoricoAsosEditadasRepository = void 0;
var _typeorm = require("typeorm");
var _utils = _interopRequireDefault(require("../../../../config/utils"));
var _HistoricoEdicaoAso = _interopRequireDefault(require("../entities/HistoricoEdicaoAso"));
var _dec, _class;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const fs = require('fs');
let HistoricoAsosEditadasRepository = exports.HistoricoAsosEditadasRepository = (_dec = (0, _typeorm.EntityRepository)(_HistoricoEdicaoAso.default), _dec(_class = class HistoricoAsosEditadasRepository extends _typeorm.Repository {
  async findHistoricoAsosEditadas() {
    const util = new _utils.default();
    var data = util.formatDate(new Date());
    const exameAso = await this.find({
      where: {
        data_alteracao: data
      }
    });
    return exameAso;
  }
  async findAsosEditadasPeriodo(datainicio, datafim) {
    console.log('chegou akiiiiii');
    const exameAso = await this.find({
      where: {
        data_alteracao: (0, _typeorm.Between)(datainicio, datafim)
      }
    });
    return exameAso;
  }
}) || _class);
var _default = exports.default = HistoricoAsosEditadasRepository;