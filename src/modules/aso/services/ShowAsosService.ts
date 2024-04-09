import { getCustomRepository } from "typeorm";
import Aso from "../typeorm/entities/Aso";
import { AsosRepository } from "../typeorm/repositories/AsosRepository";
import AppError from '@shared/errors/AppError';
import HistoricoAsoExcluida from "../typeorm/entities/HistoricoAsoExcluida";
import HistoricoAsosExcluidasRepository from "../typeorm/repositories/HistoricoAsosExcluidasRepository";

interface IRequest{
    id: string
}


interface IRequestASO{
    aso_id: string
}

interface IRequest2{
    datainicio: string,
    datafim: string,
    tipopagamento: string,
    usuario: string,
    empresa: string,
    empresafora: string
}

class ShowAsosService{

    public async execute({id}: IRequest): Promise<Aso>{

       //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
        const asosRepository = getCustomRepository(AsosRepository);
        const aso = await asosRepository.findById(id);

        if(!aso){
             throw new AppError('Exame de Aso não encontrado')
            //return aso
        }

        return aso;

    }


        public async findAso({aso_id}: IRequestASO): Promise<Aso>{

       //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
        const asosRepository = getCustomRepository(AsosRepository);
        const aso = await asosRepository.findById(aso_id);

        if(!aso){
            throw new AppError('Exame de Aso não encontrado')
        }

        return aso;

    }

    public async listAsosCriadas(): Promise<Aso[]>{
          //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
          const asosCriadasRepository = getCustomRepository(AsosRepository);
          const asosCriadas = await asosCriadasRepository.findHistoricoAsosCriadas();

        if(!asosCriadas){
            throw new AppError('Aso não encontrado')
        }

        return asosCriadas;
    }
    public async listAsosExcluidas(): Promise<HistoricoAsoExcluida[]>{
          //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
          const asosExcluidasRepository = getCustomRepository(HistoricoAsosExcluidasRepository);
          const asosExcluidas = await asosExcluidasRepository.findHistoricoAsosExcluidas();

        if(!asosExcluidas){
            throw new AppError('Aso não encontrado')
        }

        return asosExcluidas;
    }



 public async executeRelatorioFechamento({datainicio,datafim,tipopagamento,usuario,empresa,empresafora}:IRequest2): Promise<Aso[] | undefined>{

             const asosRepository = getCustomRepository(AsosRepository);
             
        if(empresafora=='0'){ //entra caso nao escolha a opcao empresa fora
                if((usuario == '0')&&(tipopagamento == '0')&&(empresa == '0')&&(empresafora == '0')){//entra se nao tiver tipo pagamento
                    console.log('selecionou somente o periodo fechamento ')
                    var examesAso = await asosRepository.findRelatorioFechamentoPeriodo(datainicio,datafim);
                }

                else if((usuario != '0')&&(tipopagamento == '0') && (empresa == '0')&&(empresafora == '0')){//entra se nao tiver tipo pagamento
                   // console.log('selecionou usuario ')
                //    var examesAso = await asosRepository.findExamesRealizadosPeriodoUsuario(datainicio,datafim,usuario);

                    }

                else if((usuario == '0')&&(tipopagamento != '0') && (empresa == '0')&&(empresafora == '0')){//entra se nao tiver tipo pagamento
                    //    console.log('selecionou tipo pagamento ')
               //     var examesAso = await asosRepository.findExamesRealizadosPeriodoTipoPagamento(datainicio,datafim,tipopagamento);

                        }

                else if((tipopagamento != '0') && (usuario != '0') && (empresa == '0')&&(empresafora == '0')){
                    //    console.log('selecionou tipo pagamento e usuario')
               //     var examesAso = await asosRepository.findExamesRealizadosPeriodoTipoPagamentoUsuario(datainicio,datafim,tipopagamento,usuario);

                    }

                else if((empresa != '0')&&(tipopagamento == '0')&&(usuario == '0')&&(empresafora == '0')){
                    // console.log('selecionou empresa')
                //    var examesAso = await asosRepository.findExamesRealizadosPeriodoEmpresa(datainicio,datafim,empresa);
                        }

                else if((empresa != '0')&&(tipopagamento != '0')&&(usuario == '0')&&(empresafora == '0')){
                     //   console.log(' selecionou empresa e tipo pagamento ')
                //    var examesAso = await asosRepository.findExamesRealizadosPeriodoEmpresaTipoPagamento(datainicio,datafim,empresa,tipopagamento);
                        }
                    }

                else if(empresafora == 'sim'){
                        // console.log(' selecionou empresa fora ')
                //    var examesAso = await asosRepository.findExamesRealizadosPeriodoEmpresaFora(datainicio,datafim,empresa,tipopagamento);
                                }

                else if(empresafora == 'nao'){
                      // console.log(' selecionou empresa fora ')
             //       var examesAso = await asosRepository.findExamesRealizadosPeriodoEmpresaForaNao(datainicio,datafim,empresa,tipopagamento);
                            }

                if(!examesAso){
                    throw new AppError('Aso não encontrado')
                }

        return examesAso;
    }













}

export default ShowAsosService;
