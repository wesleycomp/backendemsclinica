import { getCustomRepository } from "typeorm";
import Procedimentos from "../typeorm/entities/Procedimentos";
import { ProcedimentosRepository } from "../typeorm/repositories/ProcedimentosRepository";


// interface IPaginationProcedimentos{

//     from: number;
//     to: number;
//     per_page: number;
//     total: number;
//     current_page: number;
//     prev_page: number | null;
//     next_page: number | null;
//     last_page: number | null;
//     data: Procedimentos[];

// }


class ListProcedimentosService{

    public async execute(): Promise<Procedimentos[]>{

         //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
        const procedimentosRepository = getCustomRepository(ProcedimentosRepository);
        const Procedimentos = procedimentosRepository.find();
     //   const Procedimentos = await procedimentosRepository.createQueryBuilder().paginate();

        //console.log(Procedimentos)
        return Procedimentos;
    }
}

export default ListProcedimentosService;
