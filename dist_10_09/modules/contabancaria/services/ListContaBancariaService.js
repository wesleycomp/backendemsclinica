"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _typeorm = require("typeorm");
var _ContaBancariaRepository = _interopRequireDefault(require("../typeorm/repositories/ContaBancariaRepository"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class ListContaBancariaService {
  async execute() {
    const repo = (0, _typeorm.getCustomRepository)(_ContaBancariaRepository.default);
    return repo.findAll();
  }
}
var _default = exports.default = ListContaBancariaService;