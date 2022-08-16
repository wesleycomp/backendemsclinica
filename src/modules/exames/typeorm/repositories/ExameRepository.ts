import { EntityRepository, Repository } from 'typeorm'
import Exame from '../entities/Exame'


interface IExame{
    especialidademedica_id: string;
    name: string;
    valoravista: number;
    valormedico: number;
    valorems: number;
    ativo: boolean;
}


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
        const exame = await this.findOne(id);
        return exame;
    }

    // public async createExame({especialidademedica_id,name,valoravista,valormedico,valorems,ativo}: IExame): Promise<Exame>{
    //     const exame = this.create({

    //         especialidademedica_id: especialidademedica_id,
    //         name: name,
    //         valoravista: valoravista,
    //         valormedico: valormedico,
    //         valorems: valorems,
    //         ativo: ativo
    //     });
    //     await this.save(exame);

    //     return exame;
    // }
}
export default ExameRepository;
