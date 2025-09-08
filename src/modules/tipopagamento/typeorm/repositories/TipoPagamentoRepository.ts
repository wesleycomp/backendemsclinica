import { EntityRepository, Repository } from 'typeorm'
import TipoPagamento from '../entities/TipoPagamento'

@EntityRepository(TipoPagamento)
export class TipoPagamentoRepository extends Repository<TipoPagamento>{

    public async findByName(codigo: string): Promise<TipoPagamento | undefined>{

        const TipoPagamento = await this.findOne({
            where: {
                codigo,
            }
        })
        return TipoPagamento;
    }

    public async findById(codigo: string): Promise<TipoPagamento | undefined> {

        const TipoPagamento = await this.findOne({
            where: {
                     codigo,
                   }
        })
        return TipoPagamento;
    }
}

export default TipoPagamentoRepository;
