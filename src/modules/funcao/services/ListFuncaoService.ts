import { getCustomRepository } from "typeorm";
import Funcao from "../typeorm/entities/Funcao";
import { FuncaoRepository } from "../typeorm/repositories/FuncoesRepository";


// interface IPaginationFuncao{

//     from: number;
//     to: number;
//     per_page: number;
//     total: number;
//     current_page: number;
//     prev_page: number | null;
//     next_page: number | null;
//     last_page: number | null;
//     data: Funcao[];

// }


class ListFuncaoService{

    public async execute(): Promise<Funcao[]>{

         //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
        const funcoesRepository = getCustomRepository(FuncaoRepository);
        const funcao = funcoesRepository.find();
     //   const funcao = await funcoesRepository.createQueryBuilder().paginate();

        //console.log(funcao)
        return funcao;
    }
}

export default ListFuncaoService;
