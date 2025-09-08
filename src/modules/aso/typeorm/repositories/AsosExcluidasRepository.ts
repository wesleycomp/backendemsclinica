import { EntityRepository, Repository } from 'typeorm'
import AsosExcluidas from '../entities/AsosExcluidas';
import utils from '@config/utils';
const fs = require('fs');

@EntityRepository(AsosExcluidas)
export class AsosExcluidasRepository extends Repository<AsosExcluidas>{


    public async findById(id: string): Promise<AsosExcluidas | undefined> {
        const aso = await this.findOne(id,{ where: {
            aso_id: id
                }
            });
        return aso;
    }

}
export default AsosExcluidasRepository;
