import { Request , Response } from "express";
import ListFinanceiroService from "../services/ListFinanceiroService";
import ShowFinanceiroService from "../services/ShowFinanceiroService";

export default class FinanceiroController{

    public async index(request: Request, response: Response): Promise<Response>{

        const listFinanceiros = new ListFinanceiroService();
        const Financeiros = await listFinanceiros.execute();

        return response.json(Financeiros);
    }

    public async show(request: Request, response: Response): Promise<Response>{

        const { id } = request.params;
        const showFinanceiros = new ShowFinanceiroService();
        const Fornecedor = await showFinanceiros.execute({ id })

        return response.json(Fornecedor);

    }





 }
