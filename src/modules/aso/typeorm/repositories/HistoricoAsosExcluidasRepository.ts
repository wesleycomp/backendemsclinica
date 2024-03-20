import { EntityRepository,Between, Repository } from 'typeorm'
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


  public async findAsosExcluidasPeriodo(datainicio: string,datafim: string): Promise<HistoricoAsoExcluida[] | undefined> {

    // console.log('chegou akiiiiii')
        const exameAso = await this.find({
      //    where:{
        //    data_exclusao: Between(datainicio,datafim)
      //    },
        });

        return exameAso;
    }


}
export default HistoricoAsosExcluidasRepository;
