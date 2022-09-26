import { getCustomRepository } from "typeorm";
import { ConvenioEmpresaRepository } from "../typeorm/repositories/ConvenioEmpresaRepository";

interface IRequest{
    id: string
}


class DeleteFuncaoService{

    public async execute({id}: IRequest): Promise<void>{

        //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
        const convenioEmpresaRepository = getCustomRepository(ConvenioEmpresaRepository);
        const funcao = await convenioEmpresaRepository.findOne(id);

        if(!funcao){
            throw new AppError('Convenio Empresa não encontrado')
        }

        await convenioEmpresaRepository.remove(funcao)

    }
}

export default DeleteFuncaoService;
