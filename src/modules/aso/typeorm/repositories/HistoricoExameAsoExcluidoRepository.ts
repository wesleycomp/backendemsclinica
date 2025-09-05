import { EntityRepository, Repository } from 'typeorm'
import utils from '@config/utils';
import HistoricoExameAsoExcluido from '../entities/HistoricoExameAsoExcluido';
const fs = require('fs');


@EntityRepository(HistoricoExameAsoExcluido)
export class HistoricoExamesAsosExcluidasRepository extends Repository<HistoricoExameAsoExcluido>{


    public async findHistoricoAsosExcluidas(): Promise<HistoricoExameAsoExcluido[] | undefined>{

        const util = new utils()
        var data = util.formatDate(new Date());

        const exameAso = await this.find({});

         return exameAso;
    }
}
export default HistoricoExamesAsosExcluidasRepository;
