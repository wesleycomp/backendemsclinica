import { EntityRepository, Repository } from 'typeorm'
import utils from '@config/utils';
import HistoricoAsoExcluida from '../entities/HistoricoAsoExcluida';
const fs = require('fs');


@EntityRepository(HistoricoAsoExcluida)
export class HistoricoAsosExcluidasRepository extends Repository<HistoricoAsoExcluida>{


    public async findHistoricoAsosExcluidas(): Promise<HistoricoAsoExcluida[] | undefined>{

        const util = new utils()
        var data = util.formatDate(new Date());

        const exameAso = await this.find({
            where: {
            data_exclusao: data
            },
            relations: ['empresa','paciente','tipopagamento','user'],
         });

         return exameAso;
    }
}
export default HistoricoAsosExcluidasRepository;
