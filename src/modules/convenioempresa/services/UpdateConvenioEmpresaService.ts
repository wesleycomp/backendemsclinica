import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import ConvenioEmpresa from "../typeorm/entities/ConvenioEmpresa";
import { ConvenioEmpresaRepository } from "../typeorm/repositories/ConvenioEmpresaRepository";

interface IRequest{
    id: string;
    empresa_id: string;
    exame_id: string;
    valorexame: number;
    valormedico: number;
    valorems: number;
    ativo: boolean;
    user_id: string;
}

class UpdateConvenioEmpresaService{

    public async execute({id,empresa_id,exame_id,valorexame,valorems,valormedico,ativo,user_id}: IRequest): Promise<ConvenioEmpresa>{

        //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
        const convenioEmpresaRepository = getCustomRepository(ConvenioEmpresaRepository);
        const convenioEmpresa = await convenioEmpresaRepository.findById(id);

        if(!convenioEmpresa){
            throw new AppError('Convenio Empresa não encontrado')
        }


        const convenioEmpresaExists= await convenioEmpresaRepository.findByEmpresa(empresa_id)

        if(convenioEmpresaExists && empresa_id != convenioEmpresa.empresa_id && exame_id != convenioEmpresa.exame_id){

            throw new AppError('Convenio Empresa ja existente')
        }

        convenioEmpresa.empresa_id = empresa_id;
        convenioEmpresa.exame_id = exame_id;
        convenioEmpresa.valorexame = valorexame;
        convenioEmpresa.valorems = valorems;
        convenioEmpresa.valormedico = valormedico;
        convenioEmpresa.ativo = ativo;
        convenioEmpresa.user_id=user_id;

        await convenioEmpresaRepository.save(convenioEmpresa)
        return convenioEmpresa;
    }
}

export default UpdateConvenioEmpresaService;
