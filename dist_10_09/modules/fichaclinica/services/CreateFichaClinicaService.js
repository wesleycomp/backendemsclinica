"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _typeorm = require("typeorm");
var _FichaClinicaRepository = require("../typeorm/repositories/FichaClinicaRepository");
class CreateFichaClinicaService {
  async execute({
    aso_id,
    pergunta,
    resposta,
    observacao
  }) {
    //instaciou o repositorio para ter acesso aos metodos(save, delete... etc)
    const fichaClinicaRepository = (0, _typeorm.getCustomRepository)(_FichaClinicaRepository.FichaClinicaRepository);

    //   const  empresaExists= await fichaClinicaRepository.findByName(pergunta)
    // if(empresaExists){
    //     throw new AppError('Perg ja existente')
    // }

    const fichaClinica = fichaClinicaRepository.create({
      aso_id,
      pergunta,
      resposta,
      observacao
    });
    await fichaClinicaRepository.save(fichaClinica);
    return fichaClinica;
  }
}
var _default = exports.default = CreateFichaClinicaService;