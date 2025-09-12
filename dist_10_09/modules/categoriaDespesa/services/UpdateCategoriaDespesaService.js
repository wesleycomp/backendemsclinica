"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _typeorm = require("typeorm");
var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));
var _CategoriaDespesaRepository = require("../typeorm/repositories/CategoriaDespesaRepository");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class UpdateCategoriaDespesaService {
  async execute({
    id,
    nome,
    codigo,
    ativo
  }) {
    const repo = (0, _typeorm.getCustomRepository)(_CategoriaDespesaRepository.CategoriaDespesaRepository);
    const item = await repo.findOne(id);
    if (!item) throw new _AppError.default('Categoria de despesa não encontrada');
    const dup = await repo.findByNome(nome);
    if (dup && dup.id !== id) throw new _AppError.default('Nome já utilizado em outra categoria');
    item.nome = nome;
    if (typeof codigo !== 'undefined') {
      item.codigo = codigo;
    }
    item.ativo = ativo;
    await repo.save(item);
    return item;
  }
}
var _default = exports.default = UpdateCategoriaDespesaService;