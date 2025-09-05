import { EntityRepository, Repository } from 'typeorm';
import CentroCusto from '../entities/CentroCusto';

@EntityRepository(CentroCusto)
export class CentroCustoRepository extends Repository<CentroCusto> {
  public async findByNome(nome: string): Promise<CentroCusto | undefined> {
    return this.findOne({ where: { nome } });
  }
  public async findAll(): Promise<CentroCusto[]> {
    return this.find({ order: { nome: 'ASC' } });
  }
}
export default CentroCustoRepository;
