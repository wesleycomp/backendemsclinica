"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _typeorm = require("typeorm");
var _EmpresaRepository = require("../typeorm/repositories/EmpresaRepository");
class SearchEmpresaService {
  async execute({
    search
  }) {
    const empresaRepository = (0, _typeorm.getCustomRepository)(_EmpresaRepository.EmpresaRepository);
    let empresas;
    if (search) {
      empresas = await empresaRepository.find({
        where: [{
          nome: (0, _typeorm.Like)(`%${search}%`)
        }, {
          cnpj: (0, _typeorm.Like)(`%${search}%`)
        }],
        order: {
          nome: 'ASC'
        }
      });
    } else {
      empresas = await empresaRepository.find({
        order: {
          nome: 'ASC'
        }
      });
    }
    return empresas.map(e => ({
      ...e,
      nome_cnpj: `${e.nome} - ${e.cnpj}`
    }));
  }
}
var _default = exports.default = SearchEmpresaService;