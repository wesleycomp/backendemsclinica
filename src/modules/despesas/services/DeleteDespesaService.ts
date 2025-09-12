import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import { DespesaRepository } from '../typeorm/repositories/DespesaRepository';

interface IRequest { id: string; }

class DeleteDespesaService {
  public async execute({ id }: IRequest): Promise<void> {
    const repo = getCustomRepository(DespesaRepository);
    const item = await repo.findOne(id);
    if (!item) throw new AppError('Despesa não encontrada');
    await repo.remove(item);
  }
}
export default DeleteDespesaService;
