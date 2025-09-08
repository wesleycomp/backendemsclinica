import { EntityRepository, Repository } from 'typeorm'
import TipoAso from '../../../aso/typeorm/entities/TipoAso'

@EntityRepository(TipoAso)
export class TipoAsoRepository extends Repository<TipoAso>{

    public async findByName(codigo: string): Promise<TipoAso | undefined>{

        const TipoAso = await this.findOne({
            where: {
                codigo,
            }
        })
        return TipoAso;
    }

    public async findById(codigo: string): Promise<TipoAso | undefined> {

        const TipoAso = await this.findOne({
            where: {
                     codigo,
                   }
        })
        return TipoAso;
    }
}

export default TipoAsoRepository;
