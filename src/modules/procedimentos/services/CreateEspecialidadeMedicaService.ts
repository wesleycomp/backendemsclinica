import { getCustomRepository } from 'typeorm';
import { ProcedimentosRepository } from '../typeorm/repositories/ProcedimentosRepository';
import AppError from '@shared/errors/AppError';

interface IRequest {
  name: string;
  codigoEsocial: string;
}

class CreateEspecialidadeMedicaService {
  public async execute({ name, codigoEsocial }: IRequest) {
    const procedimentosRepository = getCustomRepository(ProcedimentosRepository);

    const jaExiste = await procedimentosRepository.findOne({ where: { name } });
    if (jaExiste) {
      throw new AppError('Procedimento já cadastrado');
    }

    const procedimento = procedimentosRepository.create({
      name,
      // coluna na tabela é "codigoesocial"
      codigoesocial: codigoEsocial,
    });

    await procedimentosRepository.save(procedimento);
    return procedimento;
  }
}

export default CreateEspecialidadeMedicaService;
