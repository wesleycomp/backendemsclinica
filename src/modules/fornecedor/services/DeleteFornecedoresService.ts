import { getCustomRepository } from "typeorm";
import { FornecedorRepository } from "../typeorm/repositories/FornecedorRepository";

interface IRequest{
    id: string
}


class DeleteFornecedorService{

    public async execute({id}: IRequest): Promise<void>{

        //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
        const fornecedorRepository = getCustomRepository(FornecedorRepository);
        const fornecedor = await fornecedorRepository.findOne(id);

        if(!fornecedor){
            throw new AppError('Fornecedor não encontrada')
        }

        await fornecedorRepository.remove(fornecedor)

    }
}

export default DeleteFornecedorService;
