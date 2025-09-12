import { EntityRepository, Repository } from 'typeorm'

import Procedimentos from '../entities/Procedimentos'

@EntityRepository(Procedimentos)
export class ProcedimentosRepository extends Repository<Procedimentos>{

    public async findByName(name: string): Promise<Procedimentos | undefined>{

        const Procedimentos = await this.findOne({
            where: {
                name,
            }
        })

        return Procedimentos;
    }


       public async findById(id: string): Promise<Procedimentos | undefined> {

        const Procedimentos = await this.findOne({
            where: {
                     id,
                   }
        })
        return Procedimentos;

    }

}
export default ProcedimentosRepository;
