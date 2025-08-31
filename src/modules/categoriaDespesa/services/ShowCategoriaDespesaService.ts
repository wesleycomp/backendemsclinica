import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import CategoriaDespesa from '../typeorm/entities/CategoriaDespesa';
import { CategoriaDespesaRepository } from '../typeorm/repositories/CategoriaDespesaRepository';

interface IRequest { id: string; }

class ShowCategoriaDespesaService {
  public async execute({ id }: IRequest): Promise<CategoriaDespesa> {
    const repo = getCustomRepository(CategoriaDespesaRepository);
    const item = await repo.findOne(id);
    if (!item) throw new AppError('Categoria de despesa não encontrada');
    return item;
  }
}

export default ShowCategoriaDespesaService;
