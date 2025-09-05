import { EntityRepository, Repository } from 'typeorm'
import HistoricoExclusaoExameAso from '../entities/HistoricoExclusaoExameAso'
import utils from '@config/utils';
const fs = require('fs');


@EntityRepository(HistoricoExclusaoExameAso)
export class HistoricoExclusaoExameAsoRepository extends Repository<HistoricoExclusaoExameAso>{


    public async findExameAsoExcluidas(): Promise<HistoricoExclusaoExameAso[] | undefined>{

        const util = new utils()
        var data = util.formatDate(new Date());

        const exameAso = await this.find({
            where: {
            data_exclusao: data
            }
         });

         return exameAso;
    }
}
export default HistoricoExclusaoExameAsoRepository;
