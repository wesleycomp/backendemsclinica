"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.PerguntaFichaClinicaRepository = void 0;
var _typeorm = require("typeorm");
var _PerguntaFichaClinica = _interopRequireDefault(require("../entities/PerguntaFichaClinica"));
var _dec, _class;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
let PerguntaFichaClinicaRepository = exports.PerguntaFichaClinicaRepository = (_dec = (0, _typeorm.EntityRepository)(_PerguntaFichaClinica.default), _dec(_class = class PerguntaFichaClinicaRepository extends _typeorm.Repository {
  async findById(id) {
    const perguntaFichaClinica = await this.findOne(id, {
      relations: ['perguntafichaclinica']
    });
    return perguntaFichaClinica;
  }
}) || _class);
var _default = exports.default = PerguntaFichaClinicaRepository;