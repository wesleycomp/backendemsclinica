import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import { CentroCustoRepository } from '../typeorm/repositories/CentroCustoRepository';

interface IRequest { id: string; }

class DeleteCentroCustoService {
  public async execute({ id }: IRequest): Promise<void> {
    const repo = getCustomRepository(CentroCustoRepository);
    const item = await repo.findOne(id);
    if (!item) throw new AppError('Centro de custo não encontrado');
    await repo.remove(item);
  }
}
export default DeleteCentroCustoService;
