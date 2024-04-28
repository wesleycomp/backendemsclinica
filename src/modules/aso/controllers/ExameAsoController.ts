import { Request , Response } from "express";
import CreateExameAsoService from "../services/CreateExameAsoService";
import UpdateExameAsoService from "../services/UpdateExameAsoService";
import ListExamesAsoService from "../services/ListExamesAsoService";
import ShowExameAsoService from "../services/ShowExamesAsosService";
import CreateHistoricoExclusaoExameAso from "../services/CreateHistoricoExclusaoExameAsoService";
import ShowAsosService from "../services/ShowAsosService";
import DeleteExameAsoService from "../services/DeleteExameAsoService";
import utils from "@config/utils";
import { Console } from "console";

//teste git
export default class ExameAsoController{

    public async index(request: Request, response: Response): Promise<Response>{

        const listExamesAso = new ListExamesAsoService();
        const examesAso = await listExamesAso.execute();

        return response.json(examesAso);
    }

   public async showExamesPeriodo(request: Request, response: Response): Promise<Response>{

        const { datainicio } = request.params;
        const { datafim } = request.params;
        const { tipopagamento } = request.params;
        const { usuario } = request.params;
        const { empresa } = request.params;
        const { empresafora } = request.params;
        const showExameAso = new ShowExameAsoService();
        const exame = await showExameAso.executeExamesPeriodo({datainicio,datafim,tipopagamento,usuario,empresa,empresafora})

        return response.json(exame);

        }


   public async showRelatorioFechamentoEmpresa(request: Request, response: Response): Promise<Response>{

        const { datainicio } = request.params;
        const { datafim } = request.params;
        const { tipopagamento } = request.params;
        const { empresa } = request.params;
            const showExameAso = new ShowExameAsoService();
        const exame = await showExameAso.executeRelatorioFechamentoEmpresa({datainicio,datafim,empresa,tipopagamento})

        return response.json(exame);

        }



    public async showExames(request: Request, response: Response): Promise<Response>{

        const showExameAso = new ShowExameAsoService();
        const exame = await showExameAso.executeExames()

        return response.json(exame);
    }

    public async show(request: Request, response: Response): Promise<Response>{

        const { aso_id } = request.params;
        const showExameAso = new ShowExameAsoService();
        const exame = await showExameAso.execute({ aso_id })

        return response.json(exame);
    }

    public async showAsoValores(request: Request, response: Response): Promise<Response>{

        const { aso_id } = request.params;
        const showExameAso = new ShowExameAsoService();
        const exame = await showExameAso.executeValoresAso({ aso_id })

        return response.json(exame);
    }


    public async create(request: Request, response: Response): Promise<Response>{
        const {
            aso_id,
            exame_id,
            valorexame,
            valormedico,
            valorems,
            ativo,
            tipopagamento_id,
            user_id
        } = request.body;

        const createExame = new CreateExameAsoService();

        const exame = await createExame.execute({
            aso_id,
            exame_id,
            valorexame,
            valormedico,
            valorems,
            ativo,
            tipopagamento_id,
            user_id
        });
        return response.json(exame);
    }

      public async update(request: Request, response: Response): Promise<Response>{

        const {
            desconto,
            valorexamesemdesconto,
            user_desconto

        } = request.body;
        const { id } = request.params;
        const updateExame = new UpdateExameAsoService();

        const exame = await updateExame.execute({
            id,
            desconto,
            valorexamesemdesconto,
            user_desconto
        });

        return response.json(exame);
    }


   public async delete(request: Request, response: Response): Promise<Response>{
        const {id,usuario_id} = request.params;

        const util = new utils()
        var created_at  = util.formatDate(new Date());

        //PESQUISANDO na TABELA  EXAMEASO
        const exameAsoRepository = new ShowExameAsoService();
        const exameaso = await exameAsoRepository.findExameAso({ id });

        const aso_id: string = exameaso.aso_id
        const exame_id: string = exameaso.exame_id
        const tipopagamento_id: string = exameaso.tipopagamento_id

        //PESQUISANDO AGORA A ASO
        const asoRepository = new ShowAsosService;
        const aso = await asoRepository.findAso({ aso_id });

        const paciente_id: string = aso.paciente_id
        const empresa_id: string = aso.empresa_id
        const funcao_id: string = aso.funcao_id

        const historioExclusaoExameAso = new CreateHistoricoExclusaoExameAso();
        const historicoExclusaoExame = await historioExclusaoExameAso.execute({
           aso_id,
           exame_id,
           tipopagamento_id,
           paciente_id,
           empresa_id,
           funcao_id,
           usuario_id,
           created_at
        });

        const deleteExameAso = new DeleteExameAsoService()
        await deleteExameAso.execute({ id })

        return response.json(historicoExclusaoExame);
    }



   public async showExameAsoExcluidas(request: Request, response: Response): Promise<Response>{

        const showExameAsoExcluida = new ShowExameAsoService();
        const examesAsosExcluidas = await showExameAsoExcluida.listExamesAsoExluidas()
        return response.json(examesAsosExcluidas);
    }

public async showFechamentoMedicoExames(request: Request, response: Response): Promise<Response>{

        const { medico_id } = request.params;
        const { datainicio } = request.params;
        const { datafim } = request.params;
        const { exame_id } = request.params;
        const showFechamentoMedico = new ShowExameAsoService();
        const fechamentoMedico = await showFechamentoMedico.executeFechamentoMedicoExames({datainicio, datafim, medico_id, exame_id })

        return response.json(fechamentoMedico);
    }


 }
