import { getCustomRepository } from "typeorm";
import ConvenioEmpresa from "../typeorm/entities/ConvenioEmpresa";
import { ConvenioEmpresaRepository } from "../typeorm/repositories/ConvenioEmpresaRepository";
import AppError from '@shared/errors/AppError';

interface IRequest{
    id: string
}

class ShowConvenioEmpresaService{

    public async execute({id}: IRequest): Promise<ConvenioEmpresa>{

       //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
        const convenioEmpresaRepository = getCustomRepository(ConvenioEmpresaRepository);
        const ConvenioEmpresa = await convenioEmpresaRepository.findOne(id);

        if(!ConvenioEmpresa){
            throw new AppError('Convenio Empresa não encontrado')
        }

        return ConvenioEmpresa;
    }
}

export default ShowConvenioEmpresaService;
