"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.AlteracoesUsuariosRepository = void 0;
var _typeorm = require("typeorm");
var _AlteracoesUsuarios = _interopRequireDefault(require("../entities/AlteracoesUsuarios"));
var _dec, _class;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const fs = require('fs');
let AlteracoesUsuariosRepository = exports.AlteracoesUsuariosRepository = (_dec = (0, _typeorm.EntityRepository)(_AlteracoesUsuarios.default), _dec(_class = class AlteracoesUsuariosRepository extends _typeorm.Repository {
  async findAll() {
    const aso = await this.find({
      where: {
        ativo: true
      },
      relations: ['empresa', 'tipoaso', 'medico', 'paciente', 'paciente.funcao', 'tipopagamento']
    });
    return aso;
  }
}) || _class);
var _default = exports.default = AlteracoesUsuariosRepository;