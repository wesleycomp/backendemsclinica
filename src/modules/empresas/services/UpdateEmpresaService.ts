import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Empresa from "../typeorm/entities/Empresa";
import { EmpresaRepository } from "../typeorm/repositories/EmpresaRepository";

interface IRequest{
    id: string;
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


class UpdateEmpresaService{

    public async execute({ id,
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
}: IRequest): Promise<Empresa>{

            //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
        const empresaRepository = getCustomRepository(EmpresaRepository);
        const Empresa = await empresaRepository.findOne(id);

        if(!Empresa){
            throw new AppError('Empresa não encontrada')
        }


        const EmpresaExists= await empresaRepository.findByName(nome)

        if(EmpresaExists && nome != Empresa.nome){

            throw new AppError('Empresa ja existente')
        }

        Empresa.nome = nome;
        Empresa.cnpj = cnpj;
        Empresa.inscricaoestadual=inscricaoestadual;
        Empresa.inscricaomunicipal=inscricaomunicipal;
        Empresa.endereco=endereco;
        Empresa.telefone=telefone;
        Empresa.email=email;
        Empresa.responsavel=responsavel;
        Empresa.esocial=esocial;
        Empresa.convenio=convenio;

        await empresaRepository.save(Empresa)

        return Empresa;
    }
}

export default UpdateEmpresaService;