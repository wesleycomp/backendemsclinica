import { EntityRepository, Repository } from 'typeorm'
import Aso from '../entities/Aso'

@EntityRepository(Aso)
export class AsosRepository extends Repository<Aso>{

    public async findByName(name: string): Promise<Aso | undefined>{
        const aso = await this.findOne({
            where: {
                name,
            }
        })
        return aso;
    }

       public async findById(id: string): Promise<Aso | undefined> {
        const aso = await this.findOne(id,{
            relations: ['empresa','tipoaso','clinica','medico']
        });
        return aso;
    }

        public async findAll(): Promise<Aso[]> {
        const aso = await this.find({
            relations: ['empresa','tipoaso','clinica','medico']
        });
        return aso;
    }

}
export default AsosRepository;
