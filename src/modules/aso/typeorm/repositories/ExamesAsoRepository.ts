import { Between, EntityRepository, Repository } from 'typeorm'
import ExameAso from '../entities/ExamesAso'

@EntityRepository(ExameAso)
export class ExamesAsoRepository extends Repository<ExameAso>{

    public async findByName(name: string): Promise<ExameAso | undefined>{
        const exameAso = await this.findOne({
            where: {
                name,
            }
        })
        return exameAso;
    }

    public async findById(id: string): Promise<ExameAso | undefined> {
        const exameAso = await this.findOne(id,{
            relations: ['exame','aso','aso.empresa','aso.paciente','aso.medico','aso.funcao','aso.tipoaso','aso.tipopagamento']
        });
        return exameAso;
    }

    public async findExamesByAso(aso_id: string): Promise<ExameAso[] | undefined> {
        const exameAso = await this.find({ where: {
               aso_id: aso_id
            },
            relations: ['exame','exame.procedimento']
        });
        return exameAso;
      }

  public async findExamesRealizadosPeriodo(datainicio: string,datafim: string): Promise<ExameAso[] | undefined> {
//console.log(datainicio,datafim)

        const exameAso = await this.find({
          where:{
           created_at: Between(datainicio,datafim)
          },
        //  nome: Like('%'+id+'%')
         relations: ['exame','aso','aso.empresa','aso.paciente','aso.medico','aso.funcao','aso.tipoaso','aso.tipopagamento','aso.user']
    //  relations: ['aso']
        });

        return exameAso;
    }


    public async findExamesRealizados(): Promise<ExameAso[] | undefined> {

        const exameAso = await this.find({
        // relations: ['exameaso','exameaso.aso','exameaso.aso.empresa','exameaso.aso.paciente','exameaso.aso.medico','exameaso.aso.funcao','exameaso.aso.tipoaso','exameaso.aso.tipopagamento']
        relations: ['exameaso']
    });

        return exameAso;
    }

    public async findByAso(aso_id: string): Promise<ExameAso[] | undefined>{

        const exameAso = await this.find({
             where: {
               aso_id: aso_id
            },
         relations: ['exame','exame.procedimento']
         });
        return exameAso;
    }

   public async findByAsoAll(aso_id: string): Promise<ExameAso[] | undefined>{
        const exameAso = await this.find({
             where: {
               aso_id: aso_id
            },
             relations: ['aso','exame','aso.empresa','aso.paciente']
         });
        return exameAso;
    }
}
export default ExamesAsoRepository;
