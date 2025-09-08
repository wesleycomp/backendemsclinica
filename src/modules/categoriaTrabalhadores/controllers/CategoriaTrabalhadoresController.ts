import { Request , Response } from "express";


import ListcategoriatrabalhadoresService from "../services/ListCategoriaTrabalhadoresServices";
import ShowcategoriatrabalhadoresService from "../services/ShowCategoriaTrabalhadoresServices";


export default class CategoriaTrabalhadoresController{

    public async index(request: Request, response: Response): Promise<Response>{

        const listcategoriatrabalhadores = new ListcategoriatrabalhadoresService();
        const categoriatrabalhadores = await listcategoriatrabalhadores.execute();
        return response.json(categoriatrabalhadores);
    }

    public async show(request: Request, response: Response): Promise<Response>{

        const { id } = request.params;
        const showcategoriatrabalhadores = new ShowcategoriatrabalhadoresService();
        const categoriatrabalhadores = await showcategoriatrabalhadores.execute({ id })

        return response.json(categoriatrabalhadores);

    }


 }
