import { getCustomRepository } from "typeorm";
import ConvenioEmpresa from "../typeorm/entities/ConvenioEmpresa";
import { ConvenioEmpresaRepository } from "../typeorm/repositories/ConvenioEmpresaRepository";


// interface IPaginationConvenioEmpresa{

//     from: number;
//     to: number;
//     per_page: number;
//     total: number;
//     current_page: number;
//     prev_page: number | null;
//     next_page: number | null;
//     last_page: number | null;
//     data: ConvenioEmpresa[];

// }


class ListConvenioEmpresaService{

    public async execute(): Promise<ConvenioEmpresa[]>{

         //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
        const convenioEmpresaRepository = getCustomRepository(ConvenioEmpresaRepository);
        const ConvenioEmpresa = convenioEmpresaRepository.findAll();//reescrevi para buscar a empresa e o exame no msmo objeto
        //   const ConvenioEmpresa = await convenioEmpresaRepository.createQueryBuilder().paginate();
        //console.log(ConvenioEmpresa)
        return ConvenioEmpresa;
    }
}

export default ListConvenioEmpresaService;
