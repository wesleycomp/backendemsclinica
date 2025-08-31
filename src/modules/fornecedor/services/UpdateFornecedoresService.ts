import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Fornecedor from "../typeorm/entities/Fornecedor";
import { FornecedorRepository } from "../typeorm/repositories/FornecedorRepository";

interface IRequest{
    id: string;
    nome: string;
    cnpj: string;
    cpf: string;
    inscricaoestadual: string;
    inscricaomunicipal: string;
    endereco: string;
    telefone: string;
    email: string;
    responsavel: string;
    ehlaboratorio: boolean;

}


class UpdateFornecedorService{

    public async execute({ id,
                    nome,
                    cnpj,
                    cpf,
                    inscricaoestadual,
                    inscricaomunicipal,
                    endereco,
                    telefone,
                    email,
                    responsavel,
                    ehlaboratorio
}: IRequest): Promise<Fornecedor>{

            //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
        const fornecedorRepository = getCustomRepository(FornecedorRepository);
        const fornecedor = await fornecedorRepository.findOne(id);

        if(!fornecedor){
            throw new AppError('Fornecedor não encontrada')
        }


        const fornecedorExists= await fornecedorRepository.findByName(nome)

        if(fornecedorExists && nome != fornecedor.nome){

            throw new AppError('Fornecedor ja existente')
        }

        fornecedor.nome = nome;
        fornecedor.cnpj = cnpj;
          fornecedor.cpf = cpf;
        fornecedor.inscricaoestadual=inscricaoestadual;
        fornecedor.inscricaomunicipal=inscricaomunicipal;
        fornecedor.endereco=endereco;
        fornecedor.telefone=telefone;
        fornecedor.email=email;
        fornecedor.responsavel=responsavel;
        fornecedor.ehlaboratorio=ehlaboratorio;

        await fornecedorRepository.save(fornecedor)

        return fornecedor;
    }
}

export default UpdateFornecedorService;
