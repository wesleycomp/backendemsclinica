import { getCustomRepository } from "typeorm";
import Empresa from "../typeorm/entities/Empresa";
import { EmpresaRepository } from "../typeorm/repositories/EmpresaRepository";
import AppError from '@shared/errors/AppError';

interface IRequest{
    nome: string;
    cnpj: string;
    cpf: string;
    ideEmpregador: string;
    inscricaoestadual: string;
    inscricaomunicipal: string;
    endereco: string;
    telefone: string;
    email: string;
    responsavel: string;
    esocial: boolean;
    convenio: boolean;
    observacao: string;
}

class CreateEmpresaService{

    public async execute({
                    nome,
                    cnpj,
                    cpf,
                    ideEmpregador,
                    inscricaoestadual,
                    inscricaomunicipal,
                    endereco,
                    telefone,
                    email,
                    responsavel,
                    esocial,
                    convenio,
                    observacao}: IRequest): Promise<Empresa>{

        //instaciou o repositorio para ter acesso aos metodos(save, delete... etc)
        const empresaRepository = getCustomRepository(EmpresaRepository);

        const  empresaExists= await empresaRepository.findByName(nome)

        if(empresaExists){

            throw new AppError('Empresa ja existente')

        }

        const empresa = empresaRepository.create({
                    nome,
                    cnpj,
                    cpf,
                    ideEmpregador,
                    inscricaoestadual,
                    inscricaomunicipal,
                    endereco,
                    telefone,
                    email,
                    responsavel,
                    esocial,
                    convenio,
                    observacao
        });

        await empresaRepository.save(empresa)
        return empresa;
    }
}

export default CreateEmpresaService;
