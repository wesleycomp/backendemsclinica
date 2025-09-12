"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.HistoricoExamesAsosExcluidasRepository = void 0;
var _typeorm = require("typeorm");
var _utils = _interopRequireDefault(require("../../../../config/utils"));
var _HistoricoExameAsoExcluido = _interopRequireDefault(require("../entities/HistoricoExameAsoExcluido"));
var _dec, _class;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const fs = require('fs');
let HistoricoExamesAsosExcluidasRepository = exports.HistoricoExamesAsosExcluidasRepository = (_dec = (0, _typeorm.EntityRepository)(_HistoricoExameAsoExcluido.default), _dec(_class = class HistoricoExamesAsosExcluidasRepository extends _typeorm.Repository {
  async findHistoricoAsosExcluidas() {
    const util = new _utils.default();
    var data = util.formatDate(new Date());
    const exameAso = await this.find({});
    return exameAso;
  }
}) || _class);
var _default = exports.default = HistoricoExamesAsosExcluidasRepository;