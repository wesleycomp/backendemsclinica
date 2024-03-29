import { getCustomRepository } from "typeorm";
import ConvenioEmpresa from "../typeorm/entities/ConvenioEmpresa";
import { ConvenioEmpresaRepository } from "../typeorm/repositories/ConvenioEmpresaRepository";
import AppError from '@shared/errors/AppError';

interface IRequest{
    empresa_id: string;
    exame_id: string;
    valorexame: number;
    valormedico: number;
    valorems: number;
    ativo: boolean;
    user_id: string;
}

class CreateConvenioEmpresaService{

    public async execute({empresa_id,exame_id,valorexame,valorems,valormedico,ativo,user_id}: IRequest): Promise<ConvenioEmpresa>{

        //instaciou o repositorio para ter acesso aos metodos(save, delete... etc)
    const convenioempresaRepository = getCustomRepository(ConvenioEmpresaRepository);

        const ConvenioEmpresaExists= await convenioempresaRepository.findByConvenioEmpresa(empresa_id,exame_id)

        if(ConvenioEmpresaExists){

            throw new AppError(' Ja existe esse exame no Convenio Empresa ')

        }

        const ConvenioEmpresa = convenioempresaRepository.create({
            empresa_id,exame_id,valorexame,valorems,valormedico,ativo,user_id
        });

        await convenioempresaRepository.save(ConvenioEmpresa)

        return ConvenioEmpresa;

    }
}

export default CreateConvenioEmpresaService;
