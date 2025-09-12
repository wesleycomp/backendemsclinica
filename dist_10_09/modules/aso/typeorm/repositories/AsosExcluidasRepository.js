"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.AsosExcluidasRepository = void 0;
var _typeorm = require("typeorm");
var _AsosExcluidas = _interopRequireDefault(require("../entities/AsosExcluidas"));
var _dec, _class;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const fs = require('fs');
let AsosExcluidasRepository = exports.AsosExcluidasRepository = (_dec = (0, _typeorm.EntityRepository)(_AsosExcluidas.default), _dec(_class = class AsosExcluidasRepository extends _typeorm.Repository {
  async findById(id) {
    const aso = await this.findOne(id, {
      where: {
        aso_id: id
      }
    });
    return aso;
  }
}) || _class);
var _default = exports.default = AsosExcluidasRepository;