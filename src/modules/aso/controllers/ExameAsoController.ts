import { Request , Response } from "express";
import CreateExameAsoService from "../services/CreateExameAsoService";
import  UpdateExameAsoService from "../services/UpdateExameAsoService";
import DeleteExameAsoService from "../services/DeleteExameAsoService";

import ListExamesAsoService from "../services/ListExamesAsoService";
import ShowExameAsoService from "../services/ShowExamesAsosService";

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
        const showExameAso = new ShowExameAsoService();
        const exame = await showExameAso.executeExamesPeriodo({datainicio,datafim})

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
            user_desconto,
            updated_at

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
        const { id } = request.params;
        const deleteExameAso = new DeleteExameAsoService()

        await deleteExameAso.execute({ id })
     //   await deleteExameAso.executeRemoveAso({ id })
        return response.json([]);
    }


 }
