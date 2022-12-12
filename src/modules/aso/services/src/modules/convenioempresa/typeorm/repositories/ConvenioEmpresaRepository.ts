import { EntityRepository, Repository } from 'typeorm'

import ConvenioEmpresa from '../entities/ConvenioEmpresa'

@EntityRepository(ConvenioEmpresa)
export class ConvenioEmpresaRepository extends Repository<ConvenioEmpresa>{

     //     public async findAll(): Promise<ConvenioEmpresa[]> {
     //   const exame = await this.find({
    //        relations: ['empresa','exame','exame.especialidademedica']
    //    });
    //    return exame;
   // }


    public async findByEmpresa(empresa_id: string): Promise<ConvenioEmpresa[] | undefined>{

        const convenioempresa = await this.find({
            where: {
               empresa_id: empresa_id
            },
            relations: ['empresa','exame','exame.especialidademedica']
        });

       // console.log(convenioempresa)

        return convenioempresa;
    }


/* funcao acima anteriormente
    public async findByEmpresa(empresa_id: string): Promise<ConvenioEmpresa | undefined>{

        const convenioempresa = await this.findOne({
            where: {
               empresa_id: empresa_id
            },
            relations: ['empresa','exame','exame.especialidademedica']
        });

       // console.log(convenioempresa)

        return convenioempresa;
    }
*/

       public async findById(id: string): Promise<ConvenioEmpresa | undefined> {


              const convenioempresa = await this.findOne({
                where: {
                     id,
                   }
           // relations: ['empresa','exame','exame.especialidademedica']
        });

        return convenioempresa;

    }

   public async findByIdExame(exame_id: string): Promise<ConvenioEmpresa | undefined> {

        const convenioempresa = await this.findOne({
            where: {
                     exame_id,
                   }
        })
        return convenioempresa;

    }


        public async findAll(): Promise<ConvenioEmpresa[]> {
        const exame = await this.find({
            relations: ['empresa','exame','exame.especialidademedica']
        });
        return exame;
    }


}
export default ConvenioEmpresaRepository;
