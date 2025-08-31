import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import { DespesaParcelaRepository } from '../typeorm/repositories/DespesaParcelaRepository';

interface IRequest { id: string; }

class DeleteDespesaParcelaService {
  public async execute({ id }: IRequest): Promise<void> {
    const repo = getCustomRepository(DespesaParcelaRepository);
    const parcela = await repo.findOne(id);
    if (!parcela) throw new AppError('Parcela não encontrada');
    await repo.remove(parcela);
  }
}
export default DeleteDespesaParcelaService;
