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
            relations: ['exame','aso','aso.empresa','aso.paciente','aso.medico','aso.medicoexaminador','aso.funcao','aso.tipoaso','aso.tipopagamento']
        });
        return exameAso;
    }


    public async findByExameAso(id: string): Promise<ExameAso[] | undefined>{

        const exameAso = await this.find({
             where: {
               id: id
            },
         relations: ['exame','exame.procedimento']
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

    public async findExamesAso(aso_id: string): Promise<ExameAso[] | undefined> {
        const exameAso = await this.find({ where: {
               aso_id: aso_id
            },
        });
        return exameAso;
      }


  public async findExamesRealizadosPeriodo(datainicio: string,datafim: string): Promise<ExameAso[] | undefined> {

    // console.log('chegou akiiiiii')
        const exameAso = await this.find({
          where:{
            data_cadastro_exame: Between(datainicio,datafim)
          },
         relations: ['exame','aso','aso.empresa','aso.paciente','aso.medico','aso.medicoexaminador','aso.funcao','aso.tipoaso','aso.tipopagamento','aso.user']
        });

    //    console.log(exameAso)

        return exameAso;
    }


      public async findExamesRealizadosPeriodoTipoPagamento(datainicio: string,datafim: string, tipopagamento: string ): Promise<ExameAso[] | undefined> {
        const exameAso = await this.find({
          where:{
            data_cadastro_exame: Between(datainicio,datafim),
            tipopagamento_id:tipopagamento
          },
         relations: ['exame','aso','aso.empresa','aso.paciente','aso.medico','aso.medicoexaminador','aso.funcao','aso.tipoaso','aso.tipopagamento','aso.user']
        });
        return exameAso;
    }

       public async findExamesRealizadosPeriodoTipoPagamentoUsuario(datainicio: string,datafim: string, tipopagamento: string , usuario: string ): Promise<ExameAso[] | undefined> {
        const exameAso = await this.find({
          where:{
                   data_cadastro_exame: Between(datainicio,datafim),
                   tipopagamento_id:tipopagamento,
                   user_id:usuario
                },
         relations: ['exame','aso','aso.empresa','aso.paciente','aso.medico','aso.medicoexaminador','aso.funcao','aso.tipoaso','aso.tipopagamento','aso.user']
        });



        return exameAso;
    }

      public async findExamesRealizadosPeriodoUsuario(datainicio: string,datafim: string,  usuario: string ): Promise<ExameAso[] | undefined> {
        const exameAso = await this.find({
          where:{
            data_cadastro_exame: Between(datainicio,datafim),
            user_id:usuario
          },
         relations: ['exame','aso','aso.empresa','aso.paciente','aso.medico','aso.medicoexaminador','aso.funcao','aso.tipoaso','aso.tipopagamento','aso.user']
        });
        return exameAso;
    }
      public async findExamesRealizadosPeriodoEmpresa(datainicio: string,datafim: string, empresa: string ): Promise<ExameAso[] | undefined> {
        const exameAso = await this.find({
          where:{
           data_cadastro_exame: Between(datainicio,datafim),
           aso: { empresa_id: empresa }
        },
         relations: ['exame','aso','aso.empresa','aso.paciente','aso.medico','aso.medicoexaminador','aso.funcao','aso.tipoaso','aso.tipopagamento','aso.user']
        });
        return exameAso;
    }

  public async findExamesRealizadosPeriodoEmpresaTipoPagamento(datainicio: string,datafim: string, empresa: string ,tipopagamento: string ): Promise<ExameAso[] | undefined> {
        const exameAso = await this.find({
          where:{
           data_cadastro_exame: Between(datainicio,datafim),
           aso: { empresa_id: empresa },
           tipopagamento_id:tipopagamento

        },
         relations: ['exame','aso','aso.empresa','aso.paciente','aso.medico','aso.medicoexaminador','aso.funcao','aso.tipoaso','aso.tipopagamento','aso.user']
        });
        return exameAso;
    }

    public async findExamesRealizadosPeriodoEmpresaFora(datainicio: string,datafim: string, empresa: string ,tipopagamento: string ): Promise<ExameAso[] | undefined> {
        const exameAso = await this.find({
          where:{
           data_cadastro_exame: Between(datainicio,datafim),
           aso: { empresa: { empresafora: "sim"} }
        },
         relations: ['exame','aso','aso.empresa','aso.paciente','aso.medico','aso.medicoexaminador','aso.funcao','aso.tipoaso','aso.tipopagamento','aso.user']
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
