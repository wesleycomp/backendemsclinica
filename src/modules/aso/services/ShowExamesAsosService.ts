import { getCustomRepository } from "typeorm";
import ExamesAso from "../typeorm/entities/ExamesAso";
import { ExamesAsoRepository } from "../typeorm/repositories/ExamesAsoRepository";
import AppError from '@shared/errors/AppError';
import HistoricoAsoExcluida from "../typeorm/entities/HistoricoAsoExcluida";
import HistoricoExclusaoExameAsoRepository from "../typeorm/repositories/HistoricoExclusaoExameAsoRepository";
import HistoricoExclusaoExameAso from "../typeorm/entities/HistoricoExclusaoExameAso";

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
    public async executeExamesPeriodo({datainicio,datafim,tipopagamento,usuario,empresa,empresafora}:IRequest2): Promise<ExamesAso[] | undefined>{
          //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)

console.log('tipopagamento:'+tipopagamento+'  empresa: '+empresa+'  usuario: '+empresa+' empresafora:'+empresafora)


        const examesAsosRepository = getCustomRepository(ExamesAsoRepository);
   // const examesAso = ""
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


      else if((empresafora == 'sim')&&(tipopagamento == '0')&&(usuario == '0')){

            console.log(' selecionou empresa fora ')
            var examesAso = await examesAsosRepository.findExamesRealizadosPeriodoEmpresaFora(datainicio,datafim,empresa,tipopagamento);

            }

        //  console.log(examesAso)
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


}
export default ShowExamesAsosService;
