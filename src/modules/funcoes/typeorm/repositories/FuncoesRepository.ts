import { EntityRepository, Repository } from 'typeorm'

import Funcao from '../entities/Funcao'

@EntityRepository(Funcao)
export class FuncaoRepository extends Repository<Funcao>{

    public async findByName(name: string): Promise<Funcao | undefined>{

        const funcao = this.findOne({
            where: {
                name,
            }
        })

        return funcao;
    }


}

