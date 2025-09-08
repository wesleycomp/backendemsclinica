import { getCustomRepository } from "typeorm";
import { FinanceiroRepository } from "../typeorm/repositories/FinanceiroRepository";
import AppError from '@shared/errors/AppError';
import Empresa from "@modules/empresa/typeorm/entities/Empresa";

interface IRequest{
    id: string
}


class ShowFinanceiroService{

    public async execute({id}: IRequest): Promise<Empresa>{

       //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
        const financeiroRepository = getCustomRepository(FinanceiroRepository);
        const financeiro = await financeiroRepository.findOne(id);

        if(!financeiro){
            throw new AppError('Exames  não encontrados')
        }


        return financeiro;


    }
}

export default ShowFinanceiroService;
