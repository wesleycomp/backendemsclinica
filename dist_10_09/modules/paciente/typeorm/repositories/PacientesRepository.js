"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.PacientesRepository = void 0;
var _typeorm = require("typeorm");
var _Paciente = _interopRequireDefault(require("../entities/Paciente"));
var _dec, _class;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
//const { Op } = require("sequelize");
let PacientesRepository = exports.PacientesRepository = (_dec = (0, _typeorm.EntityRepository)(_Paciente.default), _dec(_class = class PacientesRepository extends _typeorm.Repository {
  async findByName(id) {
    //const { Op } = require("sequelize");

    const paciente = await this.find({
      where: {
        //  nome: id
        nome: (0, _typeorm.Like)('%' + id + '%')
        //nome: { [Op.like]: `%${id}%` }
      },
      relations: ['empresa', 'funcao', 'categoriatrabalhador', 'nacionalidade']
    });
    return paciente;
  }
  async findById(id) {
    const paciente = await this.findOne({
      where: {
        id
      },
      relations: ['empresa', 'funcao', 'categoriatrabalhador', 'nacionalidade']
    });
    return paciente;
  }
  async pesquisaByCpf(id) {
    //const { Op } = require("sequelize");

    const paciente = await this.find({
      where: {
        //  nome: id
        cpf: (0, _typeorm.Like)('%' + id + '%')
        //nome: { [Op.like]: `%${id}%` }
      },
      relations: ['empresa', 'funcao', 'categoriatrabalhador', 'nacionalidade']
    });
    return paciente;
  }
  async findPacientesAll() {
    const paciente = await this.find({
      relations: ['empresa', 'funcao', 'categoriatrabalhador', 'nacionalidade']
    });
    return paciente;
  }
  async findByCpf(cpf) {
    const paciente = await this.findOne({
      where: {
        cpf
      }
    });
    return paciente;
  }
}) || _class);
var _default = exports.default = PacientesRepository;