import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import CentroCusto from '../typeorm/entities/CentroCusto';
import { CentroCustoRepository } from '../typeorm/repositories/CentroCustoRepository';

interface IRequest { id: string; nome: string; codigo?: string; ativo: boolean; }

class UpdateCentroCustoService {
  public async execute({ id, nome, codigo, ativo }: IRequest): Promise<CentroCusto> {
    const repo = getCustomRepository(CentroCustoRepository);
    const item = await repo.findOne(id);
    if (!item) throw new AppError('Centro de custo não encontrado');

    const dup = await repo.findByNome(nome);
    if (dup && dup.id !== id) throw new AppError('Nome já utilizado');

    item.nome = nome;
    item.codigo = codigo ?? null;
    item.ativo = ativo;
    await repo.save(item);
    return item;
  }
}
export default UpdateCentroCustoService;
