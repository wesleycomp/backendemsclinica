import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import CategoriaDespesa from '../typeorm/entities/CategoriaDespesa';
import { CategoriaDespesaRepository } from '../typeorm/repositories/CategoriaDespesaRepository';

interface IRequest {
  id: string;
  nome: string;
  codigo?: string;
  ativo: boolean;
}

class UpdateCategoriaDespesaService {
  public async execute({ id, nome, codigo, ativo }: IRequest): Promise<CategoriaDespesa> {
    const repo = getCustomRepository(CategoriaDespesaRepository);

    const item = await repo.findOne(id);
    if (!item) throw new AppError('Categoria de despesa não encontrada');

    const dup = await repo.findByNome(nome);
    if (dup && dup.id !== id) throw new AppError('Nome já utilizado em outra categoria');

    item.nome = nome;
   if (typeof codigo !== 'undefined') {
        item.codigo = codigo;              
   }
    item.ativo = ativo;

    await repo.save(item);
    return item;
  }
}

export default UpdateCategoriaDespesaService;
