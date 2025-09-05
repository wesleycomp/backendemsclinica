import { getCustomRepository } from "typeorm";
import MedicoExaminador from "../typeorm/entities/MedicoExaminador";
import MedicoExaminadorRepository from "../typeorm/repositories/MedicoExaminadorRepository";


class ListMedicoExaminadorServices{

    public async execute(): Promise<MedicoExaminador[]>{

         //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
        const medicoExaminadorRepository = getCustomRepository(MedicoExaminadorRepository);
        const MedicoExaminador = await medicoExaminadorRepository.find();

        return MedicoExaminador;

    }
}

export default ListMedicoExaminadorServices;
