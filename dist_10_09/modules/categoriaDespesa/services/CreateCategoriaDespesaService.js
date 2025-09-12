"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _typeorm = require("typeorm");
var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));
var _CategoriaDespesaRepository = require("../typeorm/repositories/CategoriaDespesaRepository");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class CreateCategoriaDespesaService {
  async execute({
    nome,
    codigo,
    ativo = true
  }) {
    const repo = (0, _typeorm.getCustomRepository)(_CategoriaDespesaRepository.CategoriaDespesaRepository);
    const exists = await repo.findByNome(nome);
    if (exists) throw new _AppError.default('Categoria de despesa já cadastrada');
    const categoria = repo.create({
      nome,
      codigo,
      ativo
    });
    await repo.save(categoria);
    return categoria;
  }
}
var _default = exports.default = CreateCategoriaDespesaService;