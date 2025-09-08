import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import CentroCusto from '../typeorm/entities/CentroCusto';
import { CentroCustoRepository } from '../typeorm/repositories/CentroCustoRepository';

interface IRequest { nome: string; codigo?: string; ativo?: boolean; }

class CreateCentroCustoService {
  public async execute({ nome, codigo, ativo = true }: IRequest): Promise<CentroCusto> {
    const repo = getCustomRepository(CentroCustoRepository);
    const exists = await repo.findByNome(nome);
    if (exists) throw new AppError('Centro de custo já cadastrado');

    const cc = repo.create({ nome, codigo, ativo });
    await repo.save(cc);
    return cc;
  }
}
export default CreateCentroCustoService;
