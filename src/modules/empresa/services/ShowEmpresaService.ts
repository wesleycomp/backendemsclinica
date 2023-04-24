import { getCustomRepository } from "typeorm";
import Empresa from "../typeorm/entities/Empresa";
import { EmpresaRepository } from "../typeorm/repositories/EmpresaRepository";
import AppError from '@shared/errors/AppError';

interface IRequest{
    id: string
}


class ShowEmpresaService{

    public async execute({id}: IRequest): Promise<Empresa>{

       //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
        const empresaRepository = getCustomRepository(EmpresaRepository);
        const empresa = await empresaRepository.verificaCNPJ(id);

        if(!empresa){
            throw new AppError('Empresa não encontrada')
        }
        return empresa;
    }


        public async executeEmpresaNome({id}: IRequest): Promise<Empresa[]>{


       //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
        const empresaRepository = getCustomRepository(EmpresaRepository);
        const empresa = await empresaRepository.findByName(id);

            if(!empresa){
                throw new AppError('Empresa não encontrada')
            }
            return empresa;
        }

         public async executeEmpresaCnpj({id}: IRequest): Promise<Empresa[]>{

       //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
        const empresaRepository = getCustomRepository(EmpresaRepository);
        const empresa = await empresaRepository.findByCnpj(id);

            if(!empresa){
                throw new AppError('Empresa não encontrada')
            }
            return empresa;
        }




}

export default ShowEmpresaService;
