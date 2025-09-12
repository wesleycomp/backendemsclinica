"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _typeorm = require("typeorm");
var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));
var _CategoriaDespesaRepository = require("../typeorm/repositories/CategoriaDespesaRepository");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class DeleteCategoriaDespesaService {
  async execute({
    id
  }) {
    const repo = (0, _typeorm.getCustomRepository)(_CategoriaDespesaRepository.CategoriaDespesaRepository);
    const item = await repo.findOne(id);
    if (!item) throw new _AppError.default('Categoria de despesa não encontrada');
    await repo.remove(item);
  }
}
var _default = exports.default = DeleteCategoriaDespesaService;