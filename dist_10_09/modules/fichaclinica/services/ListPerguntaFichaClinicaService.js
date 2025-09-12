"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _typeorm = require("typeorm");
var _PerguntaFichaClinicaRepository = require("../typeorm/repositories/PerguntaFichaClinicaRepository");
class ListPerguntaFichaClinicaService {
  async execute() {
    //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
    const perguntaFichaClinicaRepository = (0, _typeorm.getCustomRepository)(_PerguntaFichaClinicaRepository.PerguntaFichaClinicaRepository);
    const perguntaFichaClinica = await perguntaFichaClinicaRepository.find();
    return perguntaFichaClinica;
  }
}
var _default = exports.default = ListPerguntaFichaClinicaService;