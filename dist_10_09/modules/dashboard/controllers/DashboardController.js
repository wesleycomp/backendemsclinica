"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _typeorm = require("typeorm");
var _DashboardRepository = _interopRequireDefault(require("../typeorm/repositories/DashboardRepository"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class DashboardController {
  async resumoFinanceiro(req, res) {
    const {
      ano,
      mes,
      dia,
      dataInicio,
      dataFim
    } = req.query;
    const repo = (0, _typeorm.getCustomRepository)(_DashboardRepository.default);
    const result = await repo.resumoFinanceiro(ano ? Number(ano) : undefined, mes ? Number(mes) : undefined, dia ? Number(dia) : undefined, dataInicio ? String(dataInicio) : undefined, dataFim ? String(dataFim) : undefined);
    return res.json(result);
  }
  async receitasPorPagamento(req, res) {
    const {
      ano,
      mes,
      dia,
      dataInicio,
      dataFim
    } = req.query;
    const repo = (0, _typeorm.getCustomRepository)(_DashboardRepository.default);
    const result = await repo.receitasPorPagamento(ano ? Number(ano) : undefined, mes ? Number(mes) : undefined, dia ? Number(dia) : undefined, dataInicio ? String(dataInicio) : undefined, dataFim ? String(dataFim) : undefined);
    return res.json(result);
  }
  async receitasVsDespesas(req, res) {
    const {
      ano,
      mes,
      dia,
      dataInicio,
      dataFim
    } = req.query;
    const repo = (0, _typeorm.getCustomRepository)(_DashboardRepository.default);
    const result = await repo.receitasVsDespesas(ano ? Number(ano) : undefined, mes ? Number(mes) : undefined, dia ? Number(dia) : undefined, dataInicio ? String(dataInicio) : undefined, dataFim ? String(dataFim) : undefined);
    return res.json(result);
  }
}
exports.default = DashboardController;