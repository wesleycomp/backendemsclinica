import { getCustomRepository } from 'typeorm';
import DespesaParcela from '../typeorm/entities/DespesaParcela';
import { DespesaParcelaRepository } from '../typeorm/repositories/DespesaParcelaRepository';

class ListDespesaParcelaService {
  public async execute(): Promise<DespesaParcela[]> {
    const repo = getCustomRepository(DespesaParcelaRepository);
    return repo.find({ order: { created_at: 'DESC' } });
  }
}
export default ListDespesaParcelaService;
