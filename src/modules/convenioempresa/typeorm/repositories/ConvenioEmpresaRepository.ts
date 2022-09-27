import { EntityRepository, Repository } from 'typeorm'

import ConvenioEmpresa from '../entities/ConvenioEmpresa'

@EntityRepository(ConvenioEmpresa)
export class ConvenioEmpresaRepository extends Repository<ConvenioEmpresa>{

    public async findByEmpresa(empresa_id: string): Promise<ConvenioEmpresa | undefined>{

        const convenioempresa = await this.findOne({
            where: {
                empresa_id
            }
        })

        return convenioempresa;
    }


       public async findById(id: string): Promise<ConvenioEmpresa | undefined> {

        const convenioempresa = await this.findOne({
            where: {
                     id,
                   }
        })
        return convenioempresa;

    }

        public async findAll(): Promise<ConvenioEmpresa[]> {
        const exame = await this.find({
            relations: ['empresa','exame']
        });
        return exame;
    }


}
export default ConvenioEmpresaRepository;
