import { EntityRepository, Repository,Between } from "typeorm";
import MedicoFechamento from "../entities/MedicoFechamento";
import ExameAso from "@modules/aso/typeorm/entities/ExamesAso"

@EntityRepository(MedicoFechamento)
export class MedicoFechamentoRepository extends Repository<MedicoFechamento>{

    public async findById(id: string): Promise<MedicoFechamento | undefined> {

        const medicofechamento = await this.findOne({
            where: {
                     id,
                   }
        })
        return medicofechamento;

    }

    public async findByMedicoFechamento(idmedico: string): Promise<MedicoFechamento[] | undefined> {

 //console.log('passou aki------>'+idmedico)
        const medicofechamento = await this.find({
            where: {
                   medico_id:idmedico,
                   },
                   relations:['medico','exame']
        })
        return medicofechamento;
    }







}
    export default MedicoFechamentoRepository;
