"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _typeorm = require("typeorm");
var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));
var _DespesaParcelaRepository = require("../typeorm/repositories/DespesaParcelaRepository");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class ShowDespesaParcelaService {
  async execute({
    id
  }) {
    const repo = (0, _typeorm.getCustomRepository)(_DespesaParcelaRepository.DespesaParcelaRepository);
    const parcela = await repo.findById(id);
    if (!parcela) throw new _AppError.default('Parcela não encontrada');
    return parcela;
  }
}
var _default = exports.default = ShowDespesaParcelaService;