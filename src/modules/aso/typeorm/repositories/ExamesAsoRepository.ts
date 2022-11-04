import { EntityRepository, Repository } from 'typeorm'
import ExameAso from '../entities/ExamesAso'

@EntityRepository(ExameAso)
export class ExamesAsoRepository extends Repository<ExameAso>{

    public async findByName(name: string): Promise<ExameAso | undefined>{
        const aso = await this.findOne({
            where: {
                name,
            }
        })
        return aso;
    }

       public async findById(id: string): Promise<ExameAso | undefined> {
        const aso = await this.findOne(id,{
            relations: ['aso']
        });
        return aso;
    }

        public async findAll(): Promise<ExameAso[]> {
        const aso = await this.find({
            relations: ['aso']
        });
        return aso;
    }

}
export default ExamesAsoRepository;
