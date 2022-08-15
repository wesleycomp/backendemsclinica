import { getCustomRepository } from "typeorm";
import EspecialidadeMedica from "../typeorm/entities/EspecialidadeMedica";
import { EspecialidadeMedicaRepository } from "../typeorm/repositories/EspecialidadeMedicaRepository";


// interface IPaginationEspecialidadeMedica{

//     from: number;
//     to: number;
//     per_page: number;
//     total: number;
//     current_page: number;
//     prev_page: number | null;
//     next_page: number | null;
//     last_page: number | null;
//     data: EspecialidadeMedica[];

// }


class ListEspecialidadeMedicaService{

    public async execute(): Promise<EspecialidadeMedica[]>{

         //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
        const funcoesRepository = getCustomRepository(EspecialidadeMedicaRepository);
        const EspecialidadeMedica = funcoesRepository.find();
     //   const EspecialidadeMedica = await funcoesRepository.createQueryBuilder().paginate();

        //console.log(EspecialidadeMedica)
        return EspecialidadeMedica;
    }
}

export default ListEspecialidadeMedicaService;
