import { getCustomRepository } from "typeorm";
import Empresa from "../typeorm/entities/Empresa";
import { EmpresaRepository } from "../typeorm/repositories/EmpresaRepository";
import AppError from '@shared/errors/AppError';

interface IRequest{
    nome: string;
    cnpj: string;
    inscricaoestadual: string;
    inscricaomunicipal: string;
    endereco: string;
    telefone: string;
    email: string;
    responsavel: string;
    esocial: boolean;
    convenio: boolean;
}

class CreateEmpresaService{

    public async execute({
                    nome,
                    cnpj,
                    inscricaoestadual,
                    inscricaomunicipal,
                    endereco,
                    telefone,
                    email,
                    responsavel,
                    esocial,
                    convenio}: IRequest): Promise<Empresa>{

        //instaciou o repositorio para ter acesso aos metodos(save, delete... etc)
    const empresaRepository = getCustomRepository(EmpresaRepository);

        const  empresaExists= await empresaRepository.findByName(nome)

        if(empresaExists){

            throw new AppError('Empresa ja existente')

        }

        const empresa = empresaRepository.create({
                    nome,
                    cnpj,
                    inscricaoestadual,
                    inscricaomunicipal,
                    endereco,
                    telefone,
                    email,
                    responsavel,
                    esocial,
                    convenio
        });

        await empresaRepository.save(empresa)

        return empresa;

    }
}

export default CreateEmpresaService;
