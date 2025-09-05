import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import { CategoriaDespesaRepository } from '../typeorm/repositories/CategoriaDespesaRepository';

interface IRequest { id: string; }

class DeleteCategoriaDespesaService {
  public async execute({ id }: IRequest): Promise<void> {
    const repo = getCustomRepository(CategoriaDespesaRepository);
    const item = await repo.findOne(id);
    if (!item) throw new AppError('Categoria de despesa não encontrada');
    await repo.remove(item);
  }
}

export default DeleteCategoriaDespesaService;
