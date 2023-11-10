import { EntityRepository, Repository } from "typeorm";
import MedicoExaminador from "../entities/MedicoExaminador";

@EntityRepository(MedicoExaminador)
export class MedicoExaminadorRepository extends Repository<MedicoExaminador>{

    public async findByName(name: string): Promise<MedicoExaminador | undefined> {

        const paciente = await this.findOne({
               where: {
                        name,
                      }
        })

        return paciente;
    }


    public async findById(id: string): Promise<MedicoExaminador | undefined> {

        const paciente = await this.findOne({
            where: {
                     id,
                   }
        })
        return paciente;

    }

    public async findByCpf(cpf: string): Promise<MedicoExaminador | undefined> {

        const paciente = await this.findOne({
            where: {
                    cpf,
                   }
        })
        return paciente;
    }
}
    export default MedicoExaminadorRepository;
