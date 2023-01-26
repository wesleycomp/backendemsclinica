import { Request , Response } from "express";
import CreateAsoService from "../services/CreateAsosService";
import CreateXMLService from "../services/CreateXMLService";
import CreateTxt2Tecnospeed from "../services/CreateTxt2Tecnospeed";
import DeleteAsoService from "../services/DeleteAsosService";
import ListAsoService from "../services/ListAsosService";
import ShowAsoService from "../services/ShowAsosService";
import UpdateAsoService from "../services/UpdateAsosService";

export default class AsosController{

    public async index(request: Request, response: Response): Promise<Response>{

        const listExame = new ListAsoService();
        const exame = await listExame.execute();

        return response.json(exame);
    }

    public async show(request: Request, response: Response): Promise<Response>{

        const { id } = request.params;
        const showExame = new ShowAsoService();
        const exame = await showExame.execute({ id })

        return response.json(exame);
    }

    public async geraXML(request: Request, response: Response): Promise<Response>{

        const { aso_id } = request.params;
        const geraXml = new CreateXMLService();
        const xml = await geraXml.execute({ aso_id })

        return response.json(xml);
    }

    public async geraTXT2TecnoSpeed (request: Request, response: Response): Promise<Response>{

        const { aso_id } = request.params;
        const geraXml = new CreateTxt2Tecnospeed();
        const xml = await geraXml.execute({ aso_id })

        return response.json(xml);


    }



    public async create(request: Request, response: Response): Promise<Response>{

        const {dataemissaoaso,paciente_id,empresa_id,funcao_id,tipoaso_id,tipopagamento_id,medico_id,resultado,temexames,transmissaoesocial,ativo,user_id} = request.body;
        const createExame = new CreateAsoService();
        const exame = await createExame.execute({
            dataemissaoaso,
            paciente_id,
            empresa_id,
            funcao_id,
            tipoaso_id,
            tipopagamento_id,
            medico_id,
            resultado,
            temexames,
            transmissaoesocial,
            ativo,
            user_id
        });

        return response.json(exame);
    }


  public async update(request: Request, response: Response): Promise<Response>{

        const {
            dataemissaoaso,
            paciente_id,
            empresa_id,
            funcao_id,
            tipoaso_id,
            tipopagamento_id,
            medico_id,
            resultado,
            temexames,
            transmissaoesocial,
            ativo,
            user_id
        } = request.body;
        const { id } = request.params;
        const updateExame = new UpdateAsoService();

        const exame = await updateExame.execute({
            id,
            dataemissaoaso,
            paciente_id,
            empresa_id,
            funcao_id,
            tipoaso_id,
            tipopagamento_id,
            medico_id,
            resultado,
            temexames,
            transmissaoesocial,
            ativo,
            user_id
        });

        return response.json(exame);
    }

   public async delete(request: Request, response: Response): Promise<Response>{

        const { id } = request.params;
        const deleteExame = new DeleteAsoService();
        await deleteExame.execute({ id })

        return response.json([]);
    }
 }
