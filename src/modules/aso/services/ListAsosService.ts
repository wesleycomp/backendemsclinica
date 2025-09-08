import { getCustomRepository } from "typeorm";
import Aso from "../typeorm/entities/Aso";
import { AsosRepository } from "../typeorm/repositories/AsosRepository";
import AppError from '@shared/errors/AppError';


// interface IPaginationexame{

//     from: number;
//     to: number;
//     per_page: number;
//     total: number;
//     current_page: number;
//     prev_page: number | null;
//     next_page: number | null;
//     last_page: number | null;
//     data: exame[];

// }


class ListAsosService{

    public async execute(): Promise<Aso[]>{

       //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
       const asosRepository = getCustomRepository(AsosRepository);
       const aso = asosRepository.findAll();
       // const exame = await funcoesRepository.createQueryBuilder().paginate();
       //console.log(exame)
        return aso;
    }



      public async pesquisaAsoNomeEmpresa(nomeEmpresa: string): Promise<Aso[]>{

       //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
       const asosRepository = getCustomRepository(AsosRepository);
       const aso = asosRepository.searcNomeEmpresa(nomeEmpresa);
       // const exame = await funcoesRepository.createQueryBuilder().paginate();
       //console.log(exame)
        return aso;
    }


          public async pesquisaAsoCnpjEmpresa(cnpj: string): Promise<Aso[]>{

       //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
       const asosRepository = getCustomRepository(AsosRepository);
       const aso = asosRepository.searcCnpjEmpresa(cnpj);
       // const exame = await funcoesRepository.createQueryBuilder().paginate();
       //console.log(exame)
        return aso;
    }

    public async pesquisaAsoNomePaciente(nomePaciente: string): Promise<Aso[]>{

       //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
       const asosRepository = getCustomRepository(AsosRepository);
       const aso = asosRepository.searcNomePaciente(nomePaciente);
       // const exame = await funcoesRepository.createQueryBuilder().paginate();
       //console.log(exame)
        return aso;
    }


       public async pesquisaAsoCpfPaciente(cpf: string): Promise<Aso[]>{

       //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
       const asosRepository = getCustomRepository(AsosRepository);
       const aso = asosRepository.searcCpfPaciente(cpf);
        return aso;
    }


}

export default ListAsosService;
