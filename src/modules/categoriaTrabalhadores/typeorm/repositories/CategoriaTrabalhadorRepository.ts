import { EntityRepository, Repository } from 'typeorm'
import CategoriaTrabalhador from '../entities/CategoriaTrabalhador'

@EntityRepository(CategoriaTrabalhador)
export class CategoriaTrabalhadorRepository extends Repository<CategoriaTrabalhador>{

    public async findByName(codigo: string): Promise<CategoriaTrabalhador | undefined>{

        const CategoriaTrabalhador = await this.findOne({
            where: {
                codigo,
            }
        })
        return CategoriaTrabalhador;
    }

    public async findById(codigo: string): Promise<CategoriaTrabalhador | undefined> {

        const CategoriaTrabalhador = await this.findOne({
            where: {
                     codigo,
                   }
        })
        return CategoriaTrabalhador;
    }
}

export default CategoriaTrabalhadorRepository;
