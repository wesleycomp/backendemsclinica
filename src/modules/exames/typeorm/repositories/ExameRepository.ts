import { EntityRepository, Repository } from 'typeorm'

import Exame from '../entities/Exame'

@EntityRepository(Exame)
export class ExameRepository extends Repository<Exame>{

    public async findByName(name: string): Promise<Exame | undefined>{

        const exame = await this.findOne({
            where: {
                name,
            }
        })

        return exame;
    }


       public async findById(id: string): Promise<Exame | undefined> {

        const exame = await this.findOne({
            where: {
                     id,
                   }
        })
        return exame;

    }

}
export default ExameRepository;
