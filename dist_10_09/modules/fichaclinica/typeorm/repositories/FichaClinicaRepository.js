"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.FichaClinicaRepository = void 0;
var _typeorm = require("typeorm");
var _FichaClinica = _interopRequireDefault(require("../entities/FichaClinica"));
var _dec, _class;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
let FichaClinicaRepository = exports.FichaClinicaRepository = (_dec = (0, _typeorm.EntityRepository)(_FichaClinica.default), _dec(_class = class FichaClinicaRepository extends _typeorm.Repository {
  async findByName(pergunta) {
    const empresa = await this.findOne({
      where: {
        pergunta
      }
    });
    return empresa;
  }
  async findByIdAso(aso_id) {
    const fichaClinica = await this.find({
      where: {
        aso_id
      },
      order: {
        categoria: "ASC",
        ordem: "ASC"
      }
    });
    return fichaClinica;
  }
  async findById(id) {
    const fichaClinica = await this.findOne({
      where: {
        id
      }
    });
    return fichaClinica;
  }
  async findFichaClinicaAso(aso_id) {
    const fichaClinicaAso = await this.find({
      where: {
        aso_id: aso_id
      }
    });
    return fichaClinicaAso;
  }
}) || _class);
var _default = exports.default = FichaClinicaRepository;