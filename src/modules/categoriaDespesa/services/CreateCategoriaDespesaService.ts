import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import CategoriaDespesa from '../typeorm/entities/CategoriaDespesa';
import { CategoriaDespesaRepository } from '../typeorm/repositories/CategoriaDespesaRepository';

interface IRequest {
  nome: string;
  codigo?: string;
  ativo?: boolean;
}

class CreateCategoriaDespesaService {
  public async execute({ nome, codigo, ativo = true }: IRequest): Promise<CategoriaDespesa> {
    const repo = getCustomRepository(CategoriaDespesaRepository);

    const exists = await repo.findByNome(nome);
    if (exists) throw new AppError('Categoria de despesa já cadastrada');

    const categoria = repo.create({ nome, codigo, ativo });
    await repo.save(categoria);
    return categoria;
  }
}

export default CreateCategoriaDespesaService;
