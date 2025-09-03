import { EntityRepository, Like, Repository } from 'typeorm'

import Empresa from '../entities/Empresa'
 //const { Op } = require("sequelize");


@EntityRepository(Empresa)
export class EmpresaRepository extends Repository<Empresa>{

    public async findByName(id: string): Promise<Empresa[] | undefined>{
 //const { Op } = require("sequelize");

        const empresa = await this.find({
            where: {
              //  nome: id
               nome: Like('%'+id+'%')
             //nome: { [Op.like]: `%${id}%` }
            }
        })

        return empresa;
    }


    public async searchByNomeOrCnpj(term: string): Promise<Empresa[]> {
  const empresas = await this.find({
    where: [
      { nome: Like(`%${term}%`) },
      { cnpj: Like(`%${term}%`) }
    ],
    order: { nome: 'ASC' }
  })

  // adiciona campo combinado nome + cnpj
  return empresas.map(e => ({
    ...e,
    nome_cnpj: `${e.nome} - ${e.cnpj}`
  })) as any
}


    public async verificaCNPJ(id: string): Promise<Empresa | undefined>{
 //const { Op } = require("sequelize");

        const empresa = await this.findOne({
            where: {
                cnpj: id
            }
        })
        return empresa;
    }


       public async pesquisaEmpresaPorID(id: string): Promise<Empresa | undefined>{
 //const { Op } = require("sequelize");

        const empresa = await this.findOne({
            where: {
                id
            }
        })
        return empresa;
    }


   public async findByCnpj(id: string): Promise<Empresa[] | undefined>{
 //const { Op } = require("sequelize");

        const empresa = await this.find({
            where: {
              //  nome: id
               cnpj: Like('%'+id+'%')
             //nome: { [Op.like]: `%${id}%` }
            }
        })

        return empresa;
    }



       public async findById(id: string): Promise<Empresa | undefined> {

        const empresa = await this.findOne({
            where: {
                     id,
                   }
        })
        return empresa;

    }

}
export default EmpresaRepository;
