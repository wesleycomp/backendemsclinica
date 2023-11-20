import { getCustomRepository } from "typeorm";
import MedicoExaminador from "../typeorm/entities/MedicoExaminador";
import MedicosRepository from "../typeorm/repositories/MedicosRepository";


class ListMedicoExaminadorServices{

    public async execute(): Promise<MedicoExaminador[]>{

         //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
        const medicosRepository = getCustomRepository(MedicosRepository);

         const Medicos = await medicosRepository.find();
        return Medicos;

    }
}

export default ListMedicoExaminadorServices;
