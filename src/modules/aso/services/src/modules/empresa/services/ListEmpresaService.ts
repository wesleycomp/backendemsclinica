import { getCustomRepository } from "typeorm";
import Empresa from "../typeorm/entities/Empresa";
import { EmpresaRepository } from "../typeorm/repositories/EmpresaRepository";


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


class ListEmpresaService{

    public async execute(): Promise<Empresa[]>{

         //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
        const empresaRepository = getCustomRepository(EmpresaRepository);
        const empresa = empresaRepository.find();
     //   const funcao = await funcoesRepository.createQueryBuilder().paginate();

        //console.log(funcao)
        return empresa;
    }
}

export default ListEmpresaService;
