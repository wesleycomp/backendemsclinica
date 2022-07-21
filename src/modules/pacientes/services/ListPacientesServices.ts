import { getCustomRepository } from "typeorm";
import Pacientes from "../typeorm/entities/Pacientes";
import PacientesRepository from "../typeorm/repositories/PacientesRepository";

class ListPacientesService{

    public async execute(): Promise<Pacientes[]>{

         //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
        const pacientesRepository = getCustomRepository(PacientesRepository);
        const user = pacientesRepository.find();

        return user;
    }
}

export default ListPacientesService;
