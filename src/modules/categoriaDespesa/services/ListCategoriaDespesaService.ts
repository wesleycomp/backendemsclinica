import { getCustomRepository } from 'typeorm';
import CategoriaDespesa from '../typeorm/entities/CategoriaDespesa';
import { CategoriaDespesaRepository } from '../typeorm/repositories/CategoriaDespesaRepository';

class ListCategoriaDespesaService {
  public async execute(): Promise<CategoriaDespesa[]> {
    const repo = getCustomRepository(CategoriaDespesaRepository);
    return repo.findAll();
  }
}

export default ListCategoriaDespesaService;
