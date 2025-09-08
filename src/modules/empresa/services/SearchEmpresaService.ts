import { getCustomRepository, Like } from "typeorm";
import Empresa from "../typeorm/entities/Empresa";
import { EmpresaRepository } from "../typeorm/repositories/EmpresaRepository";
import AppError from '@shared/errors/AppError';

interface IRequest {
  search?: string;
}

class SearchEmpresaService {
  public async execute({ search }: IRequest): Promise<any[]> {
    const empresaRepository = getCustomRepository(EmpresaRepository);

    let empresas: Empresa[];
    if (search) {
      empresas = await empresaRepository.find({
        where: [
          { nome: Like(`%${search}%`) },
          { cnpj: Like(`%${search}%`) }
        ],
        order: { nome: 'ASC' }
      });
    } else {
      empresas = await empresaRepository.find({ order: { nome: 'ASC' } });
    }

    return empresas.map(e => ({
      ...e,
      nome_cnpj: `${e.nome} - ${e.cnpj}`
    }));
  }
}

export default SearchEmpresaService;
