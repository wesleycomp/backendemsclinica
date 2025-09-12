"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _typeorm = require("typeorm");
var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));
var _CentroCustoRepository = require("../typeorm/repositories/CentroCustoRepository");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class ShowCentroCustoService {
  async execute({
    id
  }) {
    const repo = (0, _typeorm.getCustomRepository)(_CentroCustoRepository.CentroCustoRepository);
    const item = await repo.findOne(id);
    if (!item) throw new _AppError.default('Centro de custo não encontrado');
    return item;
  }
}
var _default = exports.default = ShowCentroCustoService;