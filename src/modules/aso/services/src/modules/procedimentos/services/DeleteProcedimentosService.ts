import { getCustomRepository } from "typeorm";
import { ProcedimentosRepository } from "../typeorm/repositories/ProcedimentosRepository";

interface IRequest{
    id: string
}


class DeleteProcedimentosService{

    public async execute({id}: IRequest): Promise<void>{

        //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
        const procedimentosRepository = getCustomRepository(ProcedimentosRepository);
        const Procedimentos = await procedimentosRepository.findOne(id);

        if(!Procedimentos){
            throw new AppError('Função não encontrada')
        }

        await procedimentosRepository.remove(Procedimentos)

    }
}

export default DeleteProcedimentosService;
