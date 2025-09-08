import { Request , Response } from "express";


import ListNaturezaJuridicaService from "../services/ListNaturezaJuridicaServices";
import ShowNaturezaJuridicaService from "../services/ShowNaturezaJuridicaServices";


export default class NaturezaJuridicaController{

    public async index(request: Request, response: Response): Promise<Response>{

        const listNaturezaJuridica = new ListNaturezaJuridicaService();
        const naciolidades = await listNaturezaJuridica.execute();
        return response.json(naciolidades);
    }

    public async show(request: Request, response: Response): Promise<Response>{

        const { id } = request.params;
        const showNaturezaJuridicas = new ShowNaturezaJuridicaService();
        const NaturezaJuridicas = await showNaturezaJuridicas.execute({ id })

        return response.json(NaturezaJuridicas);

    }


 }
