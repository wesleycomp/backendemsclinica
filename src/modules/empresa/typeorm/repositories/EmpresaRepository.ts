import { EntityRepository, Like, Repository } from 'typeorm'

import Empresa from '../entities/Empresa'
 const { Op } = require("sequelize");


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
