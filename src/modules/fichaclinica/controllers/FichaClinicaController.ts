import { Request , Response } from "express";
import CreateFichaClinicaService from "../services/CreateFichaClinicaService";
import DeleteFichaClinicaService from "../services/DeleteFichaClinicaService";
import ListFichaClinicaService from "../services/ListFichaClinicaService";
import ShowFichaClinicaService from "../services/ShowFichaClinicaService";
import UpdateFichaClinicaService from "../services/UpdateFichaClinicaService";

export default class FichaClinicaController{

    public async index(request: Request, response: Response): Promise<Response>{

        const listFichaClinica = new ListFichaClinicaService();
        const fichaClinicas = await listFichaClinica.execute();

        return response.json(fichaClinicas);
    }

    public async show(request: Request, response: Response): Promise<Response>{

        const { aso_id } = request.params;
        const showFichaClinica = new ShowFichaClinicaService();
        const fichaClinica = await showFichaClinica.execute({ aso_id })

        return response.json(fichaClinica);

    }

    public async create(request: Request, response: Response): Promise<Response>{

        const {
                    aso_id,
                    pergunta,
                    resposta,
                    observacao
              } = request.body;

        const createFichaClinica = new CreateFichaClinicaService();

        const fichaClinicas = await createFichaClinica.execute({
                    aso_id,
                    pergunta,
                    resposta,
                    observacao
        });

        return response.json(fichaClinicas);
    }


  public async updateResposta(request: Request, response: Response): Promise<Response>{

        const {
              resposta
              } = request.body;

        const { id } = request.params;


        const updateFichaClinica = new UpdateFichaClinicaService();

        const fichaClinica = await updateFichaClinica.executeResposta({
                id,
                resposta
        });

        return response.json(fichaClinica);
    }


public async updateObservacao(request: Request, response: Response): Promise<Response>{

        const {
              observacao
              } = request.body;

        const { id } = request.params;
        const updateFichaClinica = new UpdateFichaClinicaService();

        const fichaClinica = await updateFichaClinica.executeObservacao({
                    id,
                    observacao
        });

        return response.json(fichaClinica);
    }



   public async delete(request: Request, response: Response): Promise<Response>{

        const { id } = request.params;
        const deleteFichaClinica = new DeleteFichaClinicaService();
        await deleteFichaClinica.execute({ id })

        return response.json([]);
    }

 }
