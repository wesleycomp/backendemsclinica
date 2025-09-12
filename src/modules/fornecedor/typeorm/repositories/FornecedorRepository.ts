import { EntityRepository, Repository } from 'typeorm'

import Fornecedor from '../entities/Fornecedor'

@EntityRepository(Fornecedor)
export class FornecedorRepository extends Repository<Fornecedor>{

    public async findByName(nome: string): Promise<Fornecedor | undefined>{

        const Fornecedor = await this.findOne({
            where: {
                nome,
            }
        })

        return Fornecedor;
    }


       public async findById(id: string): Promise<Fornecedor | undefined> {

        const Fornecedor = await this.findOne({
            where: {
                     id,
                   }
        })
        return Fornecedor;

    }

}
export default FornecedorRepository;
