"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.EmpresaRepository = void 0;
var _typeorm = require("typeorm");
var _Empresa = _interopRequireDefault(require("../entities/Empresa"));
var _dec, _class;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
//const { Op } = require("sequelize");
let EmpresaRepository = exports.EmpresaRepository = (_dec = (0, _typeorm.EntityRepository)(_Empresa.default), _dec(_class = class EmpresaRepository extends _typeorm.Repository {
  async findByName(id) {
    //const { Op } = require("sequelize");

    const empresa = await this.find({
      where: {
        //  nome: id
        nome: (0, _typeorm.Like)('%' + id + '%')
        //nome: { [Op.like]: `%${id}%` }
      }
    });
    return empresa;
  }
  async searchByNomeOrCnpj(term) {
    const empresas = await this.find({
      where: [{
        nome: (0, _typeorm.Like)(`%${term}%`)
      }, {
        cnpj: (0, _typeorm.Like)(`%${term}%`)
      }],
      order: {
        nome: 'ASC'
      }
    });

    // adiciona campo combinado nome + cnpj
    return empresas.map(e => ({
      ...e,
      nome_cnpj: `${e.nome} - ${e.cnpj}`
    }));
  }
  async verificaCNPJ(id) {
    //const { Op } = require("sequelize");

    const empresa = await this.findOne({
      where: {
        cnpj: id
      }
    });
    return empresa;
  }
  async pesquisaEmpresaPorID(id) {
    //const { Op } = require("sequelize");

    const empresa = await this.findOne({
      where: {
        id
      }
    });
    return empresa;
  }
  async findByCnpj(id) {
    //const { Op } = require("sequelize");

    const empresa = await this.find({
      where: {
        //  nome: id
        cnpj: (0, _typeorm.Like)('%' + id + '%')
        //nome: { [Op.like]: `%${id}%` }
      }
    });
    return empresa;
  }
  async findById(id) {
    const empresa = await this.findOne({
      where: {
        id
      }
    });
    return empresa;
  }
}) || _class);
var _default = exports.default = EmpresaRepository;