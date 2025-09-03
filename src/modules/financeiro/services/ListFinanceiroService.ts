import { getCustomRepository } from "typeorm";
import ExameAso from "@modules/aso/typeorm/entities/ExamesAso";
import { FinanceiroRepository} from "@modules/financeiro/typeorm/repositories/FinanceiroRepository";


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


class ListFinanceiroService{

    public async execute(): Promise<ExameAso[] | undefined>{

         //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
        const financeiroRepository = getCustomRepository(FinanceiroRepository);
        const financeiro = financeiroRepository.findByFechamento();
     //   const funcao = await funcoesRepository.createQueryBuilder().paginate();

     //console.log(funcao)
        return financeiro;
    }
}

export default ListFinanceiroService;
