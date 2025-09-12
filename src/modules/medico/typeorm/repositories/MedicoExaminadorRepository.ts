import { EntityRepository, Repository } from "typeorm";
import MedicoExaminador from "../../../medicoexaminador/typeorm/entities/MedicoExaminador";

@EntityRepository(MedicoExaminador)
export class MedicoExaminadorRepository extends Repository<MedicoExaminador>{

    public async findByName(name: string): Promise<MedicoExaminador | undefined> {

        const medicoexaminador = await this.findOne({
               where: {
                        name,
                      }
        })

        return medicoexaminador;
    }


    public async findById(id: string): Promise<MedicoExaminador | undefined> {

        const medicoexaminador = await this.findOne({
            where: {
                     id,
                   }
        })
        return medicoexaminador;

    }

    public async findByCpf(cpf: string): Promise<MedicoExaminador | undefined> {

        const medicoexaminador = await this.findOne({
            where: {
                    cpf,
                   }
        })
        return medicoexaminador;
    }

    public async ListAllOrder(): Promise<MedicoExaminador[] | undefined> {

        const medicoexaminador = await this.find({
             order:{ordem:"ASC"}
        })
        return medicoexaminador;
    }
}
    export default MedicoExaminadorRepository;
