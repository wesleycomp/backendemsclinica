import { getCustomRepository } from "typeorm";
import fichaclinica from "../typeorm/entities/FichaClinica";
import { FichaClinicaRepository } from "../typeorm/repositories/FichaClinicaRepository";


// interface IPaginationFuncao{

//     from: number;
//     to: number;
//     per_page: number;
//     total: number;
//     current_page: number;
//     prev_page: number | null;
//     next_page: number | null;
//     last_page: number | null;
//     data: Funcao[];

// }


class ListFichaClinicaService{

    public async execute(): Promise<fichaclinica[]>{

         //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
        const fichaclinicaRepository = getCustomRepository(FichaClinicaRepository);
        const fichaclinica = fichaclinicaRepository.find();
     //   const funcao = await funcoesRepository.createQueryBuilder().paginate();

        //console.log(funcao)
        return fichaclinica;
    }
}

export default ListFichaClinicaService;
