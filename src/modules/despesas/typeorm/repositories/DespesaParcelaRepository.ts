import { EntityRepository, Repository } from 'typeorm';
import DespesaParcela from '../entities/DespesaParcela';

@EntityRepository(DespesaParcela)
export class DespesaParcelaRepository extends Repository<DespesaParcela> {
  public async listByDespesa(despesa_id: string): Promise<DespesaParcela[]> {
    return this.find({ where: { despesa_id }, order: { numero: 'ASC' } });
  }

  public async findById(id: string): Promise<DespesaParcela | undefined> {
    return this.findOne(id);
  }
}
export default DespesaParcelaRepository;
