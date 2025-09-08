import { Request , Response } from "express";


import ListTipoPagamentoesService from "../services/ListTipoPagamentoServices";
import ShowTipoPagamentoesService from "../services/ShowTipoPagamentoServices";


export default class TipoPagamentoController{

    public async index(request: Request, response: Response): Promise<Response>{

        const listTipoPagamentoes = new ListTipoPagamentoesService();
        const TipoPagamentoes = await listTipoPagamentoes.execute();
        return response.json(TipoPagamentoes);
    }

    public async show(request: Request, response: Response): Promise<Response>{

        const { id } = request.params;
        const showTipoPagamentoes = new ShowTipoPagamentoesService();
        const TipoPagamentoes = await showTipoPagamentoes.execute({ id })

        return response.json(TipoPagamentoes);

    }


 }
