import { EntityRepository, Repository } from 'typeorm'

import PerguntaFichaClinica from '../entities/PerguntaFichaClinica'

@EntityRepository(PerguntaFichaClinica)
export class PerguntaFichaClinicaRepository extends Repository<PerguntaFichaClinica>{

   public async findById(id: string): Promise<PerguntaFichaClinica | undefined> {
        const perguntaFichaClinica = await this.findOne(id,{
            relations: ['perguntafichaclinica']
        });
        return perguntaFichaClinica;
    }


}
export default PerguntaFichaClinicaRepository;
