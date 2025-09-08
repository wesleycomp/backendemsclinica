import { getCustomRepository } from 'typeorm';
import DespesaParcela from '../typeorm/entities/DespesaParcela';
import { DespesaParcelaRepository } from '../typeorm/repositories/DespesaParcelaRepository';

interface IRequest { despesa_id: string; }

class ListParcelasByDespesaService {
  public async execute({ despesa_id }: IRequest): Promise<DespesaParcela[]> {
    const repo = getCustomRepository(DespesaParcelaRepository);
    return repo.listByDespesa(despesa_id);
  }
}
export default ListParcelasByDespesaService;
