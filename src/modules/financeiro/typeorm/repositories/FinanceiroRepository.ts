import { EntityRepository, Repository } from 'typeorm'

import ExameAso from '@modules/aso/typeorm/entities/ExamesAso';

@EntityRepository(ExameAso)
export class FinanceiroRepository extends Repository<ExameAso>{

    public async findByFechamento( ): Promise<ExameAso[]>{
//console.log("tess  xxxxxxxxxxxxxxxxx")
        const Fechamento = await this.find({ where: {
                        ativo: true
            },
            relations: ['aso','aso.empresa','aso.paciente']
        })
        return Fechamento;
    }

    // public async findById(id: string): Promise<Empresa | undefined> {

    //     const Fechamento = await this.findOne({
    //         where: {
    //                  id,
    //                }
    //     })
    //     return Fechamento;
    // }

}
export default FinanceiroRepository;
