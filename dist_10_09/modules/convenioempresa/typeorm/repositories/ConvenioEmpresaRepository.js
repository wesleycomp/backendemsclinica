"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ConvenioEmpresaRepository = void 0;
var _typeorm = require("typeorm");
var _ConvenioEmpresa = _interopRequireDefault(require("../entities/ConvenioEmpresa"));
var _dec, _class;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
let ConvenioEmpresaRepository = exports.ConvenioEmpresaRepository = (_dec = (0, _typeorm.EntityRepository)(_ConvenioEmpresa.default), _dec(_class = class ConvenioEmpresaRepository extends _typeorm.Repository {
  //     public async findAll(): Promise<ConvenioEmpresa[]> {
  //   const exame = await this.find({
  //        relations: ['empresa','exame','exame.especialidademedica']
  //    });
  //    return exame;
  // }

  async findByEmpresa(empresa_id) {
    const convenioempresa = await this.find({
      where: {
        empresa_id: empresa_id
      },
      relations: ['empresa', 'exame', 'exame.procedimento', 'user']
    });

    // console.log(convenioempresa)

    return convenioempresa;
  }

  /* funcao acima anteriormente
      public async findByEmpresa(empresa_id: string): Promise<ConvenioEmpresa | undefined>{
  
          const convenioempresa = await this.findOne({
              where: {
                 empresa_id: empresa_id
              },
              relations: ['empresa','exame','exame.especialidademedica']
          });
  
         // console.log(convenioempresa)
  
          return convenioempresa;
      }
  */

  async findById(id) {
    const convenioempresa = await this.findOne({
      where: {
        id
      }
      // relations: ['empresa','exame','exame.especialidademedica']
    });
    return convenioempresa;
  }
  async findByIdExame(exame_id) {
    const convenioempresa = await this.findOne({
      where: {
        exame_id
      }
    });
    return convenioempresa;
  }
  async findByConvenioEmpresa(empresa_id, exame_id) {
    const convenioempresa = await this.findOne({
      where: {
        exame_id,
        empresa_id
      }
    });
    return convenioempresa;
  }
  async findAll() {
    const exame = await this.find({
      relations: ['empresa', 'exame', 'exame.especialidademedica']
    });
    return exame;
  }
}) || _class);
var _default = exports.default = ConvenioEmpresaRepository;