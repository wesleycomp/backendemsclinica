"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _typeorm = require("typeorm");
var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));
var _CentroCustoRepository = require("../typeorm/repositories/CentroCustoRepository");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class CreateCentroCustoService {
  async execute({
    nome,
    codigo,
    ativo = true
  }) {
    const repo = (0, _typeorm.getCustomRepository)(_CentroCustoRepository.CentroCustoRepository);
    const exists = await repo.findByNome(nome);
    if (exists) throw new _AppError.default('Centro de custo já cadastrado');
    const cc = repo.create({
      nome,
      codigo,
      ativo
    });
    await repo.save(cc);
    return cc;
  }
}
var _default = exports.default = CreateCentroCustoService;