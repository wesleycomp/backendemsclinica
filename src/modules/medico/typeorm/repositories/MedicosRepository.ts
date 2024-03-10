import { EntityRepository, Repository } from "typeorm";
import Medicos from "../entities/Medico";

@EntityRepository(Medicos)
export class MedicosRepository extends Repository<Medicos>{

    public async findByName(name: string): Promise<Medicos | undefined> {

        const paciente = await this.findOne({
               where: {
                        name,
                      }
        })

        return paciente;
    }


    public async findById(id: string): Promise<Medicos | undefined> {

        const paciente = await this.findOne({
            where: {
                     id,
                   }
        })
        return paciente;

    }

    public async findByCpf(cpf: string): Promise<Medicos | undefined> {

        const paciente = await this.findOne({
            where: {
                    cpf,
                   }
        })
        return paciente;
    }

      public async findMedicosAtivo(): Promise<Medicos[] | undefined> {

        const medico = await this.find({
            where: {
                    ativo:'true'
                   }
        })
        return medico;
    }
}
    export default MedicosRepository;
