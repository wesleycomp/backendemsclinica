import { getCustomRepository } from "typeorm";
import Fornecedor from "../typeorm/entities/Fornecedor";
import { FornecedorRepository } from "../typeorm/repositories/FornecedorRepository";


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


class ListFornecedorService{

    public async execute(): Promise<Fornecedor[]>{

         //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
        const fornecedorRepository = getCustomRepository(FornecedorRepository);
        const fornecedor = fornecedorRepository.find();
     //   const funcao = await funcoesRepository.createQueryBuilder().paginate();

        //console.log(funcao)
        return fornecedor;
    }
}

export default ListFornecedorService;
