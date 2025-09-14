// src/modules/financeiro/services/ShowFinanceiroService.ts
import { getRepository } from "typeorm";
import AppError from '@shared/errors/AppError';
import Empresa from "@modules/empresa/typeorm/entities/Empresa";

interface IRequest {
  id: string;
}

class ShowFinanceiroService {
  public async execute({ id }: IRequest): Promise<Empresa> {
    const repo = getRepository(Empresa);

    const empresa = await repo.findOne(id); // ajuste: busca a entidade Empresa
    if (!empresa) {
      throw new AppError('Empresa não encontrada');
    }

    return empresa; // agora o retorno bate com Promise<Empresa>
  }
}

export default ShowFinanceiroService;
