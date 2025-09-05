import { Request , Response } from "express";


import ListTipoAsoesService from "../services/ListTipoAsoServices";
import ShowTipoAsoesService from "../services/ShowTipoAsoServices";


export default class TipoAsoController{

    public async index(request: Request, response: Response): Promise<Response>{

        const listTipoAsoes = new ListTipoAsoesService();
        const TipoAsoes = await listTipoAsoes.execute();
        return response.json(TipoAsoes);
    }

    public async show(request: Request, response: Response): Promise<Response>{

        const { id } = request.params;
        const showTipoAsoes = new ShowTipoAsoesService();
        const TipoAsoes = await showTipoAsoes.execute({ id })

        return response.json(TipoAsoes);

    }


 }
