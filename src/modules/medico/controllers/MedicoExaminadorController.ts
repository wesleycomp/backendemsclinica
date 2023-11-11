import { Request , Response } from "express";
import ListMedicosService from "../services/ListMedicosServices";
import ShowMedicoExaminadorService from "../services/ShowMedicoExaminador";

export default class MedicoExaminadorController{

    public async index(request: Request, response: Response): Promise<Response>{

        const showMedicoExaminadorService = new ShowMedicoExaminadorService();
        const Medicos = await showMedicoExaminadorService.ListAllMedicoExaminadorOrder();
        return response.json(Medicos);
    }

    public async show(request: Request, response: Response): Promise<Response>{

        const { id } = request.params;
        const showMedicoExaminadorService = new ShowMedicoExaminadorService();
        const showMedicoExaminador = await showMedicoExaminadorService.execute({ id })

        return response.json(showMedicoExaminador);

    }

 }
