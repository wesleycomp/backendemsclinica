import { Request , Response } from "express";
import CreateExameService from "../services/CreateAsosService";
import DeleteExameService from "../services/DeleteAsosService";
import ListExameService from "../services/ListAsosService";
import ShowExameService from "../services/ShowAsosService";
import UpdateExameService from "../services/UpdateAsosService";

export default class ExameController{

    public async index(request: Request, response: Response): Promise<Response>{
        const listExame = new ListExameService();
        const exame = await listExame.execute();
        
        return response.json(exame);
    }

    public async show(request: Request, response: Response): Promise<Response>{

        const { id } = request.params;
        const showExame = new ShowExameService();
        const exame = await showExame.execute({ id })

        return response.json(exame);

    }

    public async create(request: Request, response: Response): Promise<Response>{

        const {dataemissaoaso,paciente_id,empresa_id,tipoexame_id,tipoaso_id,tipopagamento,medico_id,resultado,temexames,transmissaoesocial,ativo} = request.body;
        const createExame = new CreateExameService();
        const exame = await createExame.execute({
            dataemissaoaso,
            paciente_id,
            empresa_id,
            tipoexame_id,
            tipoaso_id,
            tipopagamento,
            medico_id,
            resultado,
            temexames,
            transmissaoesocial,
            ativo
        });

        return response.json(exame);
    }


  public async update(request: Request, response: Response): Promise<Response>{

        const {
            dataemissaoaso,
            paciente_id,
            empresa_id,
            tipoexame_id,
            tipoaso_id,
            tipopagamento,
            medico_id,
            resultado,
            temexames,
            transmissaoesocial,
            ativo
        } = request.body;
        const { id } = request.params;
        const updateExame = new UpdateExameService();

        const exame = await updateExame.execute({
            id,
            dataemissaoaso,
            paciente_id,
            empresa_id,
            tipoexame_id,
            tipoaso_id,
            tipopagamento,
            medico_id,
            resultado,
            temexames,
            transmissaoesocial,
            ativo
        });

        return response.json(exame);
    }

   public async delete(request: Request, response: Response): Promise<Response>{

        const { id } = request.params;
        const deleteExame = new DeleteExameService();
        await deleteExame.execute({ id })

        return response.json([]);
    }

 }
