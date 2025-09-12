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
        const exame = await this.findOne(id,{
            relations: ['procedimentos']
        });
        return exame;
    }


    public async findExamesPorLocal( ): Promise<Exame[]> {
        const exame = await this.find({
            where: {
                localrealizacaoexame: 'EMS'
            },
            order:{
                name:"ASC"
           }
        });

        return exame;
    }


        public async findAll(): Promise<Exame[]> {
        const exame = await this.find({
            relations: ['procedimento']
        });

        return exame;
    }

}
export default ExameRepository;
