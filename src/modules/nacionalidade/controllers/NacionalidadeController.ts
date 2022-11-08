import { Request , Response } from "express";


import ListNacionalidadeService from "../services/ListNacionalidadeServices";
import ShowNacionalidadeService from "../services/ShowNacionalidadeServices";


export default class NacionalidadeController{

    public async index(request: Request, response: Response): Promise<Response>{

        const listNacionalidade = new ListNacionalidadeService();
        const naciolidades = await listNacionalidade.execute();
        return response.json(naciolidades);
    }

    public async show(request: Request, response: Response): Promise<Response>{

        const { id } = request.params;
        const showNacionalidades = new ShowNacionalidadeService();
        const nacionalidades = await showNacionalidades.execute({ id })

        return response.json(nacionalidades);

    }


 }
