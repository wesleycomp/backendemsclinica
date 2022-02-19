import { getCustomRepository } from "typeorm";
import Funcao from "../typeorm/entities/Funcoes";
import { FuncaoRepository } from "../typeorm/repositories/FuncoesRepository";

class ListFuncaoService{

    public async execute(): Promise<Funcao[]>{

            //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
        const funcoesRepository = getCustomRepository(FuncaoRepository);
        const funcao = funcoesRepository.find();

        return funcao;


    }
}

export default ListFuncaoService;
