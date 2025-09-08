import { EntityRepository, Repository } from 'typeorm'

import FichaClinica from '../entities/FichaClinica'

@EntityRepository(FichaClinica)
export class FichaClinicaRepository extends Repository<FichaClinica>{

    public async findByName(pergunta: string): Promise<FichaClinica | undefined>{

        const empresa = await this.findOne({
            where: {
                pergunta,
            }
        })
        return empresa;
    }


    public async findByIdAso(aso_id: string): Promise<FichaClinica[] | undefined> {

         const fichaClinica = await this.find({
            where: {
                     aso_id,
                   },
                order:{categoria:"ASC",ordem:"ASC"}

        })
        return fichaClinica;
    }

    public async findById(id: string): Promise<FichaClinica | undefined> {

        const fichaClinica = await this.findOne({
            where: {
                     id,
                   }
        })
        return fichaClinica;
    }


     public async findFichaClinicaAso(aso_id: string): Promise<FichaClinica [] | undefined> {
        const fichaClinicaAso = await this.find({ where: {
               aso_id: aso_id
            },
        });
        return fichaClinicaAso;
      }

}
export default FichaClinicaRepository;
