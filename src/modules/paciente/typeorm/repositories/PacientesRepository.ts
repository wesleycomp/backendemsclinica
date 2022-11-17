import { EntityRepository, Repository } from "typeorm";
import Pacientes from "../entities/Paciente";

@EntityRepository(Pacientes)
export class PacientesRepository extends Repository<Pacientes>{

    public async findByName(name: string): Promise<Pacientes | undefined> {

        const paciente = await this.findOne({
               where: {
                        name,
                      }
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
