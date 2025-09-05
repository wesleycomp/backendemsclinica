import { EntityRepository, Like, Repository } from "typeorm";
import Pacientes from "../entities/Paciente";
 //const { Op } = require("sequelize");

@EntityRepository(Pacientes)
export class PacientesRepository extends Repository<Pacientes>{

     public async findByName(id: string): Promise<Pacientes[] | undefined>{
 //const { Op } = require("sequelize");

        const paciente = await this.find({
            where: {
              //  nome: id
               nome: Like('%'+id+'%')
             //nome: { [Op.like]: `%${id}%` }
            },
       relations: ['empresa','funcao','categoriatrabalhador','nacionalidade']

        })

        return paciente;
    }


    public async findById(id: string): Promise<Pacientes | undefined> {

        const paciente = await this.findOne({
            where: {
                     id,
                   },
       relations: ['empresa','funcao','categoriatrabalhador','nacionalidade']

        })
        return paciente;
    }

  public async pesquisaByCpf(id: string): Promise<Pacientes[] | undefined>{
 //const { Op } = require("sequelize");

        const paciente = await this.find({
            where: {
              //  nome: id
               cpf: Like('%'+id+'%')
             //nome: { [Op.like]: `%${id}%` }
            },
           relations: ['empresa','funcao','categoriatrabalhador','nacionalidade']

        })

        return paciente;
    }


    public async findPacientesAll(): Promise<Pacientes[]> {

        const paciente = await this.find({

       relations: ['empresa','funcao','categoriatrabalhador','nacionalidade']

        })
        return paciente;

    }

    public async findByCpf(cpf: string): Promise<Pacientes | undefined> {

        const paciente = await this.findOne({
            where: {
                    cpf,
                   }
        })
        return paciente;
    }
}
    export default PacientesRepository;
