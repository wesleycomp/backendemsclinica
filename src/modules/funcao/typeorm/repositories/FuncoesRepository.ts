import { EntityRepository, Repository } from 'typeorm'

import Funcao from '../entities/Funcao'

@EntityRepository(Funcao)
export class FuncaoRepository extends Repository<Funcao>{

    public async findByName(name: string): Promise<Funcao | undefined>{

        const funcao = await this.findOne({
            where: {
                name,
            }
        })

        return funcao;
    }


       public async findById(id: string): Promise<Funcao | undefined> {

        const funcao = await this.findOne({
            where: {
                     id,
                   }
        })
        return funcao;

    }

}
export default FuncaoRepository;
