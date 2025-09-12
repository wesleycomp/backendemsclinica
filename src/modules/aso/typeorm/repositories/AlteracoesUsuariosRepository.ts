import { EntityRepository, Repository } from 'typeorm'
import AlteracoesUsuarios from '../entities/AlteracoesUsuarios'
const fs = require('fs');

@EntityRepository(AlteracoesUsuarios)
export class AlteracoesUsuariosRepository extends Repository<AlteracoesUsuarios>{


    public async findAll(): Promise<AlteracoesUsuarios[]> {
        const aso = await this.find({ where: {
               ativo: true
            },
            relations: ['empresa','tipoaso','medico','paciente','paciente.funcao','tipopagamento']
        });
        return aso;
    }



}
export default AlteracoesUsuariosRepository;
