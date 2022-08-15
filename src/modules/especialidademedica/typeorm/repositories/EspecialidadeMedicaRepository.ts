import { EntityRepository, Repository } from 'typeorm'

import EspecialidadeMedica from '../entities/EspecialidadeMedica'

@EntityRepository(EspecialidadeMedica)
export class EspecialidadeMedicaRepository extends Repository<EspecialidadeMedica>{

    public async findByName(name: string): Promise<EspecialidadeMedica | undefined>{

        const EspecialidadeMedica = await this.findOne({
            where: {
                name,
            }
        })

        return EspecialidadeMedica;
    }


       public async findById(id: string): Promise<EspecialidadeMedica | undefined> {

        const EspecialidadeMedica = await this.findOne({
            where: {
                     id,
                   }
        })
        return EspecialidadeMedica;

    }

}
export default EspecialidadeMedicaRepository;
