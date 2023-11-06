import { EntityRepository, Repository } from 'typeorm'
import utils from '@config/utils';
import HistoricoEdicaoAso from '../entities/HistoricoEdicaoAso';
const fs = require('fs');


@EntityRepository(HistoricoEdicaoAso)
export class HistoricoAsosEditadasRepository extends Repository<HistoricoEdicaoAso>{


    public async findHistoricoAsosEditadas(): Promise<HistoricoEdicaoAso[] | undefined>{

        const util = new utils()
        var data = util.formatDate(new Date());

        const exameAso = await this.find({
            where: {
            data_alteracao: data
            }
         });

         return exameAso;
    }



}
export default HistoricoAsosEditadasRepository;
