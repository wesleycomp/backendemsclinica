import { getCustomRepository } from "typeorm";
import Fornecedor from "../typeorm/entities/Fornecedor";
import { FornecedorRepository } from "../typeorm/repositories/FornecedorRepository";
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
    ehlaboratorio: boolean;
}

class CreateFornecedorService{

    public async execute({
                    nome,
                    cnpj,
                    inscricaoestadual,
                    inscricaomunicipal,
                    endereco,
                    telefone,
                    email,
                    responsavel,
                    ehlaboratorio
                }: IRequest): Promise<Fornecedor>{

        //instaciou o repositorio para ter acesso aos metodos(save, delete... etc)
        const fornecedorRepository = getCustomRepository(FornecedorRepository);

        const  fornecedorExists= await fornecedorRepository.findByName(nome)

        if(fornecedorExists){

            throw new AppError('Fornecedor ja existente')

        }

        const fornecedor = fornecedorRepository.create({
                    nome,
                    cnpj,
                    inscricaoestadual,
                    inscricaomunicipal,
                    endereco,
                    telefone,
                    email,
                    responsavel,
                    ehlaboratorio
        });

        await fornecedorRepository.save(fornecedor)
        return fornecedor;
    }
}

export default CreateFornecedorService;
