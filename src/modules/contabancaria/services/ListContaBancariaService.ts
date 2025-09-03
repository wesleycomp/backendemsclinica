import { getCustomRepository } from 'typeorm';
import ContaBancariaRepository from '../typeorm/repositories/ContaBancariaRepository';
import ContaBancaria from '../typeorm/entities/ContaBancaria';

class ListContaBancariaService {
  public async execute(): Promise<ContaBancaria[]> {
    const repo = getCustomRepository(ContaBancariaRepository);
    return repo.findAll();
  }
}

export default ListContaBancariaService;
