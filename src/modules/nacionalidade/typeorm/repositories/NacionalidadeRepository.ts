import { EntityRepository, Repository } from 'typeorm'
import Nacionaliade from '../entities/Nacionalidade'

@EntityRepository(Nacionaliade)
export class NacionaliadeRepository extends Repository<Nacionaliade>{

    public async findByName(codigo: string): Promise<Nacionaliade | undefined>{

        const nacionalidade = await this.findOne({
            where: {
                codigo,
            }
        })
        return nacionalidade;
    }

    public async findById(codigo: string): Promise<Nacionaliade | undefined> {

        const nacionalidade = await this.findOne({
            where: {
                     codigo,
                   }
        })
        return nacionalidade;
    }
}

export default NacionaliadeRepository;
