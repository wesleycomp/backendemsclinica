import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import CentroCusto from '../typeorm/entities/CentroCusto';
import { CentroCustoRepository } from '../typeorm/repositories/CentroCustoRepository';

interface IRequest { id: string; }

class ShowCentroCustoService {
  public async execute({ id }: IRequest): Promise<CentroCusto> {
    const repo = getCustomRepository(CentroCustoRepository);
    const item = await repo.findOne(id);
    if (!item) throw new AppError('Centro de custo não encontrado');
    return item;
  }
}
export default ShowCentroCustoService;
