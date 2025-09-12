"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.HistoricoExclusaoExameAsoRepository = void 0;
var _typeorm = require("typeorm");
var _HistoricoExclusaoExameAso = _interopRequireDefault(require("../entities/HistoricoExclusaoExameAso"));
var _utils = _interopRequireDefault(require("../../../../config/utils"));
var _dec, _class;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const fs = require('fs');
let HistoricoExclusaoExameAsoRepository = exports.HistoricoExclusaoExameAsoRepository = (_dec = (0, _typeorm.EntityRepository)(_HistoricoExclusaoExameAso.default), _dec(_class = class HistoricoExclusaoExameAsoRepository extends _typeorm.Repository {
  async findExameAsoExcluidas() {
    const util = new _utils.default();
    var data = util.formatDate(new Date());
    const exameAso = await this.find({
      where: {
        data_exclusao: data
      }
    });
    return exameAso;
  }
}) || _class);
var _default = exports.default = HistoricoExclusaoExameAsoRepository;