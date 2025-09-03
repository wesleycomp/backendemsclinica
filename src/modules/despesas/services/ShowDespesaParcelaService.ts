import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import DespesaParcela from '../typeorm/entities/DespesaParcela';
import { DespesaParcelaRepository } from '../typeorm/repositories/DespesaParcelaRepository';

interface IRequest { id: string; }

class ShowDespesaParcelaService {
  public async execute({ id }: IRequest): Promise<DespesaParcela> {
    const repo = getCustomRepository(DespesaParcelaRepository);
    const parcela = await repo.findById(id);
    if (!parcela) throw new AppError('Parcela não encontrada');
    return parcela;
  }
}
export default ShowDespesaParcelaService;
