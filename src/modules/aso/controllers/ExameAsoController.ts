import { Request , Response } from "express";
import CreateExameAsoService from "../services/CreateExameAsoService";
import DeleteExameAsoService from "../services/DeleteExameAsoService";

import ListExamesAsoService from "../services/ListExamesAsoService";
import ShowExameAsoService from "../services/ShowExamesAsosService";


export default class ExameAsoController{

    public async index(request: Request, response: Response): Promise<Response>{
        const listExamesAso = new ListExamesAsoService();
        const examesAso = await listExamesAso.execute();

        return response.json(examesAso);
    }

    public async show(request: Request, response: Response): Promise<Response>{

        const { aso_id } = request.params;
        const showExameAso = new ShowExameAsoService();
        const exame = await showExameAso.execute({ aso_id })

        return response.json(exame);

    }

    public async create(request: Request, response: Response): Promise<Response>{

        const {
            aso_id,
            exame_id,
            ativo,
            usuariocadastro,
        } = request.body;
        const createExame = new CreateExameAsoService();
        const exame = await createExame.execute({
            aso_id,
            exame_id,
            ativo,
            usuariocadastro
        });

        return response.json(exame);
    }

   public async delete(request: Request, response: Response): Promise<Response>{

        const { id } = request.params;
        const deleteFuncao = new DeleteExameAsoService()
        await deleteFuncao.execute({ id })

        return response.json([]);
    }


 }
