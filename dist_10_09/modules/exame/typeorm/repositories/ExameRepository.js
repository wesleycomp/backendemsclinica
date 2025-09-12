"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ExameRepository = void 0;
var _typeorm = require("typeorm");
var _Exame = _interopRequireDefault(require("../entities/Exame"));
var _dec, _class;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
let ExameRepository = exports.ExameRepository = (_dec = (0, _typeorm.EntityRepository)(_Exame.default), _dec(_class = class ExameRepository extends _typeorm.Repository {
  async findByName(name) {
    const exame = await this.findOne({
      where: {
        name
      }
    });
    return exame;
  }
  async findById(id) {
    const exame = await this.findOne(id, {
      relations: ['procedimentos']
    });
    return exame;
  }
  async findExamesPorLocal() {
    const exame = await this.find({
      where: {
        localrealizacaoexame: 'EMS'
      },
      order: {
        name: "ASC"
      }
    });
    return exame;
  }
  async findAll() {
    const exame = await this.find({
      relations: ['procedimento']
    });
    return exame;
  }
}) || _class);
var _default = exports.default = ExameRepository;