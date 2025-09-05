import { getCustomRepository } from 'typeorm';
import CentroCusto from '../typeorm/entities/CentroCusto';
import { CentroCustoRepository } from '../typeorm/repositories/CentroCustoRepository';

class ListCentroCustoService {
  public async execute(): Promise<CentroCusto[]> {
    const repo = getCustomRepository(CentroCustoRepository);
    return repo.findAll();
  }
}
export default ListCentroCustoService;
