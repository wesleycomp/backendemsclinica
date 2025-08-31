import { getCustomRepository } from "typeorm";
import Fornecedor from "../typeorm/entities/Fornecedor";
import { FornecedorRepository } from "../typeorm/repositories/FornecedorRepository";


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


class ListFornecedoresService {
    public async execute(): Promise<Fornecedor[]> {
        const fornecedorRepository = getCustomRepository(FornecedorRepository);
        const fornecedor = await fornecedorRepository.find();
        return fornecedor;

    }
}
export default ListFornecedoresService;
