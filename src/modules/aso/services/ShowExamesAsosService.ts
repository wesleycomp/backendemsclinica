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
    public async executeExamesPeriodo({datainicio,datafim,tipopagamento,usuario}:IRequest2): Promise<ExamesAso[] | undefined>{
          //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)

        const examesAsosRepository = getCustomRepository(ExamesAsoRepository);
// console.log('entrou aqki   ===>')
        const examesAso = await examesAsosRepository.findExamesRealizadosPeriodo(datainicio,datafim);

        if((tipopagamento != '0')&&(usuario != '0')){
// console.log('entrou aqki 1 ===>')
            const examesAso = await examesAsosRepository.findExamesRealizadosPeriodoTipoPagamentoUsuario(datainicio,datafim,tipopagamento,usuario);

        }

        if((usuario != '0')&&(tipopagamento == '0')){//entra se nao tiver tipo pagamento
// console.log('entrou aqki 2 ===>')
            const examesAso = await examesAsosRepository.findExamesRealizadosPeriodoUsuario(datainicio,datafim,usuario);

            }

        if((usuario == '0')&&(tipopagamento != '0')){//entra se nao tiver tipo pagamento
// console.log('entrou aqki 3 ===>')
            const examesAso = await examesAsosRepository.findExamesRealizadosPeriodoTipoPagamento(datainicio,datafim,tipopagamento);

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


}
export default ShowExamesAsosService;
