import { getCustomRepository } from "typeorm";
import ExamesAso from "../typeorm/entities/ExamesAso";
import { ExamesAsoRepository } from "../typeorm/repositories/ExamesAsoRepository";
import AppError from '@shared/errors/AppError';
import HistoricoAsoExcluida from "../typeorm/entities/HistoricoAsoExcluida";
import HistoricoAsosExcluidasRepository from "../typeorm/repositories/HistoricoAsosExcluidasRepository";
import HistoricoExclusaoExameAsoRepository from "../typeorm/repositories/HistoricoExclusaoExameAsoRepository";
import HistoricoExclusaoExameAso from "../typeorm/entities/HistoricoExclusaoExameAso";

import HistoricoEdicaoAso from "../typeorm/entities/HistoricoEdicaoAso";
import HistoricoAsosEditadasRepository from "../typeorm/repositories/HistoricoAsosEditadasRepository";

interface IRequest{
    aso_id: string
}

interface IRequestExameAso{
     id: string
}

interface IRequest2{
    datainicio: string,
    datafim: string,
    tipopagamento: string,
    usuario: string,
    empresa: string,
    empresafora: string
}

interface IRequest3{
    datainicio: string,
    datafim: string,
    tipopagamento: string,
    empresa: string,
}
interface IRequest4{
    datainicio: string,
    datafim: string,
    medico_id: string,
    exame_id: string,

}

interface IRequest5{
    datainicio: string,
    datafim: string,
    idexame: string,

}

interface IRequest6{
    datainicio: string,
    datafim: string

}


class ShowExamesAsosService{

    public async execute({aso_id}: IRequest): Promise<ExamesAso[]>{
          //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
        const examesAsosRepository = getCustomRepository(ExamesAsoRepository);
        const examesAso = await examesAsosRepository.findByAso(aso_id);

        if(!examesAso){
            throw new AppError('Aso não encontrado')
        }

        return examesAso;
    }





    public async executeAsosExlcuidasPeriodo(datainicio:  string, datafim: string  ): Promise<HistoricoAsoExcluida[] | undefined>{

        //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
        const examesAsosRepository = getCustomRepository(HistoricoAsosExcluidasRepository);
        var examesAso = await examesAsosRepository.findAsosExcluidasPeriodo(datainicio,datafim);

          if(!examesAso){
            throw new AppError('Aso excluidas não encontradas')
        }

        return examesAso;
    }








    public async executeAsosEditadasPeriodo(datainicio:  string, datafim: string  ): Promise<HistoricoEdicaoAso[] | undefined>{

        //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
 //erserse
        const examesAsosRepository = getCustomRepository(HistoricoAsosEditadasRepository);
        var examesAso = await examesAsosRepository.findAsosEditadasPeriodo(datainicio,datafim);

          if(!examesAso){
            throw new AppError('Aso excluidas não encontradas')
        }

        return examesAso;
    }


    public async executeExamesPeriodo({datainicio,datafim,tipopagamento,usuario,empresa,empresafora}:IRequest2): Promise<ExamesAso[] | undefined>{
          //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
     const examesAsosRepository = getCustomRepository(ExamesAsoRepository);
        //console.log('tipopagamento:'+tipopagamento+'  empresa: '+empresa+'  usuario: '+empresa+' empresafora:'+empresafora)

        if(empresafora=='0'){ //entra caso nao escolha a opcao empresa fora
                if((usuario == '0')&&(tipopagamento == '0')&&(empresa == '0')&&(empresafora == '0')){//entra se nao tiver tipo pagamento
                    console.log('selecionou somente o periodo ')
                    var examesAso = await examesAsosRepository.findExamesRealizadosPeriodo(datainicio,datafim);
                }

                else if((usuario != '0')&&(tipopagamento == '0') && (empresa == '0')&&(empresafora == '0')){//entra se nao tiver tipo pagamento
                    console.log('selecionou usuario ')
                    var examesAso = await examesAsosRepository.findExamesRealizadosPeriodoUsuario(datainicio,datafim,usuario);

                    }

                else if((usuario == '0')&&(tipopagamento != '0') && (empresa == '0')&&(empresafora == '0')){//entra se nao tiver tipo pagamento
                        console.log('selecionou tipo pagamento ')
                        var examesAso = await examesAsosRepository.findExamesRealizadosPeriodoTipoPagamento(datainicio,datafim,tipopagamento);

                        }

                else if((tipopagamento != '0') && (usuario != '0') && (empresa == '0')&&(empresafora == '0')){
                        console.log('selecionou tipo pagamento e usuario')
                        var examesAso = await examesAsosRepository.findExamesRealizadosPeriodoTipoPagamentoUsuario(datainicio,datafim,tipopagamento,usuario);

                    }

                else if((empresa != '0')&&(tipopagamento == '0')&&(usuario == '0')&&(empresafora == '0')){
                    console.log('selecionou empresa')
                        var examesAso = await examesAsosRepository.findExamesRealizadosPeriodoEmpresa(datainicio,datafim,empresa);

                        }

                else if((empresa != '0')&&(tipopagamento != '0')&&(usuario == '0')&&(empresafora == '0')){
                        console.log(' selecionou empresa e tipo pagamento ')
                        var examesAso = await examesAsosRepository.findExamesRealizadosPeriodoEmpresaTipoPagamento(datainicio,datafim,empresa,tipopagamento);

                        }

                    }

                else if(empresafora == 'sim'){
                        // console.log(' selecionou empresa fora ')
                    var examesAso = await examesAsosRepository.findExamesRealizadosPeriodoEmpresaFora(datainicio,datafim,empresa,tipopagamento);
                                }

                else if(empresafora == 'nao'){
                      // console.log(' selecionou empresa fora ')
                    var examesAso = await examesAsosRepository.findExamesRealizadosPeriodoEmpresaForaNao(datainicio,datafim,empresa,tipopagamento);

                            }
                if(!examesAso){
                    throw new AppError('Aso não encontrado')
                }

        return examesAso;
    }















    public async executeRelatorioFechamentoEmpresa({datainicio,datafim,empresa,tipopagamento }:IRequest3): Promise<ExamesAso[] | undefined>{



        //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
                 const examesAsosRepository = getCustomRepository(ExamesAsoRepository);
                 if((tipopagamento == '0')){//entra se nao tiver tipo pagamento

                    var examesAso = await examesAsosRepository.findRelatorioFechamentoPeriodoEmpresa(datainicio,datafim,empresa);
                }

                else {//entra se nao tiver tipo pagamento
                   // console.log('selecionou usuario ')
                    var examesAso = await examesAsosRepository.findRelatorioFechamentoPeriodoEmpresaTipoPagamento(datainicio,datafim,empresa,tipopagamento );

                    }




                if(!examesAso){
                    throw new AppError('Aso não encontrado')
                }

        return examesAso;
    }




    public async executeExames(): Promise<ExamesAso[] | undefined>{

        //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
        const examesAsosRepository = getCustomRepository(ExamesAsoRepository);
        const examesAso = await examesAsosRepository.findExamesRealizados();

        if(!examesAso){
            throw new AppError('Aso não encontrado')
        }

        return examesAso;
    }


    public async executeValoresAso({aso_id}: IRequest): Promise<ExamesAso[] | undefined>{

        const examesAsosRepository = getCustomRepository(ExamesAsoRepository);
        const examesAso = await examesAsosRepository.findExamesByAso(aso_id);

        if(!examesAso){
            throw new AppError('Aso não encontrado')
        }
        return examesAso;
    }


    public async findExameAso({id}: IRequestExameAso): Promise<ExamesAso>{

       //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
        const exameAsoRepository = getCustomRepository(ExamesAsoRepository);
        const exameAso = await exameAsoRepository.findOne(id);

        if(!exameAso){
            throw new AppError('Exame Aso não encontrado')
        }

        return exameAso;
    }


    public async listExamesAsoExluidas(): Promise<HistoricoExclusaoExameAso[]>{

        const examesAsosRepository = getCustomRepository(HistoricoExclusaoExameAsoRepository);
        const examesAso = await examesAsosRepository.findExameAsoExcluidas();

        if(!examesAso){
            throw new AppError('Aso não encontrado')
        }

        return examesAso;
    }



      public async listAsoEditadas(): Promise<HistoricoExclusaoExameAso[]>{

        const examesAsosRepository = getCustomRepository(HistoricoExclusaoExameAsoRepository);
        const examesAso = await examesAsosRepository.findExameAsoExcluidas();

        if(!examesAso){
            throw new AppError('Aso não encontrado')
        }

        return examesAso;
    }

  public async executeFechamentoMedicoExames({datainicio, datafim, medico_id, exame_id}: IRequest4): Promise<ExamesAso[] | undefined>{

       //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
           const exameAsoRepository = getCustomRepository(ExamesAsoRepository);
           const exameAso = await exameAsoRepository.findByMedicoFechamentoExames(datainicio, datafim, medico_id, exame_id);


        return exameAso;
    }


    public async executeExamesPeriodoConsolidado({datainicio,datafim,idexame}:IRequest5): Promise<ExamesAso[] | undefined>{

        //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
   const examesAsosRepository = getCustomRepository(ExamesAsoRepository);

                  var examesAso = await examesAsosRepository.findExamesRealizadosPeriodoConsolidado(datainicio,datafim,idexame);


              if(!examesAso){
                  throw new AppError('Aso não encontrado')
              }

      return examesAso;
  }









}
export default ShowExamesAsosService;
