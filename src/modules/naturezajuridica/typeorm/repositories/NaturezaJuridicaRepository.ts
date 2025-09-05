import { EntityRepository, Repository } from 'typeorm'
import Nacionaliade from '../entities/NaturezaJuridica'

@EntityRepository(Nacionaliade)
export class NacionaliadeRepository extends Repository<Nacionaliade>{

    public async findByName(codigo: string): Promise<Nacionaliade | undefined>{

        const naturezaJuridica = await this.findOne({
            where: {
                codigo,
            }
        })
        return naturezaJuridica;
    }

    public async findById(codigo: string): Promise<Nacionaliade | undefined> {

        const naturezaJuridica = await this.findOne({
            where: {
                     codigo,
                   }
        })
        return naturezaJuridica;
    }
}

export default NacionaliadeRepository;
