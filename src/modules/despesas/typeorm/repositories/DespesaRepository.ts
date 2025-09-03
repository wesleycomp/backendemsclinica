import { EntityRepository, Repository } from 'typeorm';
import Despesa from '../entities/Despesa';

@EntityRepository(Despesa)
export class DespesaRepository extends Repository<Despesa> {
  public async findById(id: string): Promise<Despesa | undefined> {
    return this.findOne({
      where: { id },
    });
  }

  public async findAll(): Promise<Despesa[]> {
    return this.find({
      order: { created_at: 'DESC' },
    });
  }
}

export default DespesaRepository;
