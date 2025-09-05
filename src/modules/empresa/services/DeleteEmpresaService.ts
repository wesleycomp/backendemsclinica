import { getCustomRepository } from "typeorm";
import { EmpresaRepository } from "../typeorm/repositories/EmpresaRepository";
import AppError from '@shared/errors/AppError';
interface IRequest{
    id: string
}


class DeleteEmpresaService{

    public async execute({id}: IRequest): Promise<void>{

        //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
        const empresaRepository = getCustomRepository(EmpresaRepository);
        const empresa = await empresaRepository.findOne(id);

        if(!empresa){
            throw new AppError('Empresa não encontrada')
        }

        await empresaRepository.remove(empresa)

    }
}

export default DeleteEmpresaService;
