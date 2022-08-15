import { getCustomRepository } from "typeorm";
import Exame from "../typeorm/entities/Exame";
import { ExameRepository } from "../typeorm/repositories/ExameRepository";


// interface IPaginationexame{

//     from: number;
//     to: number;
//     per_page: number;
//     total: number;
//     current_page: number;
//     prev_page: number | null;
//     next_page: number | null;
//     last_page: number | null;
//     data: exame[];

// }


class ListexameService{

    public async execute(): Promise<Exame[]>{

         //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
        const exameRepository = getCustomRepository(ExameRepository);
        const exame = exameRepository.find();
     //   const exame = await funcoesRepository.createQueryBuilder().paginate();

        //console.log(exame)
        return exame;
    }
}

export default ListexameService;
