import { getCustomRepository } from "typeorm";
import TipoPagamento from "../typeorm/entities/TipoPagamento";
import TipoPagamentoRepository from "../typeorm/repositories/TipoPagamentoRepository";
import RedisCache from "@shared/cache/RedisCache";


// interface IPaginationtipopagamentos{

//     from: number;
//     to: number;
//     per_page: number;
//     total: number;
//     current_page: number;
//     prev_page: number | null;
//     next_page: number | null;
//     last_page: number | null;
//     data: tipopagamentos[];

// }


class ListTipoPagamentoesService{

    public async execute(): Promise<TipoPagamento[]>{

         //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
        const tipopagamentosRepository = getCustomRepository(TipoPagamentoRepository);

         const tipopagamentos = await tipopagamentosRepository.find();
        return tipopagamentos;

    }
}

export default ListTipoPagamentoesService;
