import { getCustomRepository } from "typeorm";
import Fornecedor from "../typeorm/entities/Fornecedor";
import { FornecedorRepository } from "../typeorm/repositories/FornecedorRepository";
import AppError from '@shared/errors/AppError';

interface IRequest{
    id: string
}


class ShowFornecedorService{

    public async execute({id}: IRequest): Promise<Fornecedor>{

       //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
        const fornecedorRepository = getCustomRepository(FornecedorRepository);
        const fornecedor = await fornecedorRepository.findOne(id);

        if(!fornecedor){
            throw new AppError('Fornecedor não encontrada')
        }


        return fornecedor;


    }
}

export default ShowFornecedorService;
