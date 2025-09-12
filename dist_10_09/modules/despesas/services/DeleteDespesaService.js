"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _typeorm = require("typeorm");
var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));
var _DespesaRepository = require("../typeorm/repositories/DespesaRepository");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class DeleteDespesaService {
  async execute({
    id
  }) {
    const repo = (0, _typeorm.getCustomRepository)(_DespesaRepository.DespesaRepository);
    const item = await repo.findOne(id);
    if (!item) throw new _AppError.default('Despesa não encontrada');
    await repo.remove(item);
  }
}
var _default = exports.default = DeleteDespesaService;