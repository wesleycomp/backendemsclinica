import { EntityRepository, Repository } from 'typeorm'

import Empresa from '../entities/Empresa'

@EntityRepository(Empresa)
export class EmpresaRepository extends Repository<Empresa>{

    public async findByName(nome: string): Promise<Empresa | undefined>{

        const empresa = await this.findOne({
            where: {
                nome,
            }
        })

        return empresa;
    }


       public async findById(id: string): Promise<Empresa | undefined> {

        const empresa = await this.findOne({
            where: {
                     id,
                   }
        })
        return empresa;

    }

}
export default EmpresaRepository;
