import { getCustomRepository } from "typeorm";
import Medicos from "../typeorm/entities/Medico";
import MedicosRepository from "../typeorm/repositories/MedicosRepository";
import RedisCache from "@shared/cache/RedisCache";


// interface IPaginationMedicos{

//     from: number;
//     to: number;
//     per_page: number;
//     total: number;
//     current_page: number;
//     prev_page: number | null;
//     next_page: number | null;
//     last_page: number | null;
//     data: Medicos[];

// }


class ListMedicosService{

    public async execute(): Promise<Medicos[]>{

         //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
        const medicosRepository = getCustomRepository(MedicosRepository);

         const Medicos = await medicosRepository.find();
        return Medicos;

    }


    public async listMedicoAtivos(): Promise<Medicos[] | undefined >{

         //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
        const medicosRepository = getCustomRepository(MedicosRepository);

        const Medicos = await medicosRepository.findMedicosAtivo();
        return Medicos;

    }
}

export default ListMedicosService;
