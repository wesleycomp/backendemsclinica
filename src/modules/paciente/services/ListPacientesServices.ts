import { getCustomRepository } from "typeorm";
import Pacientes from "../typeorm/entities/Paciente";
import PacientesRepository from "../typeorm/repositories/PacientesRepository";
import RedisCache from "@shared/cache/RedisCache";


// interface IPaginationPacientes{

//     from: number;
//     to: number;
//     per_page: number;
//     total: number;
//     current_page: number;
//     prev_page: number | null;
//     next_page: number | null;
//     last_page: number | null;
//     data: Pacientes[];

// }


class ListPacientesService{


    public async execute(): Promise<Pacientes[]>{

         //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
        const pacientesRepository = getCustomRepository(PacientesRepository);

                    const pacientes = await pacientesRepository.findPacientesAll();

                    return pacientes;

    }
}

export default ListPacientesService;
