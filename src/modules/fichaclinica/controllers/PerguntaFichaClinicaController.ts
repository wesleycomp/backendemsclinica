import { Request , Response } from "express";


import ListPerguntaFichaClinicaService from "../services/ListPerguntaFichaClinicaService";


export default class PerguntaFichaClinicaController{


   public async index(request: Request, response: Response): Promise<Response>{

        const listPerguntas = new ListPerguntaFichaClinicaService();
        const perguntas = await listPerguntas.execute();
        return response.json(perguntas);
    }


 }
