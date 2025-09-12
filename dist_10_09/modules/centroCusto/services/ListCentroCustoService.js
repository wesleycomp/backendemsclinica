"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _typeorm = require("typeorm");
var _CentroCustoRepository = require("../typeorm/repositories/CentroCustoRepository");
class ListCentroCustoService {
  async execute() {
    const repo = (0, _typeorm.getCustomRepository)(_CentroCustoRepository.CentroCustoRepository);
    return repo.findAll();
  }
}
var _default = exports.default = ListCentroCustoService;