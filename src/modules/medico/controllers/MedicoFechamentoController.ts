import { Request , Response } from "express";
import CreateFechamentoMedicoService  from "../services/CreateFechamentoMedicoService";
import ListMedicoFechamentoServices from "../services/ListMedicoFechamentoServices";
import UpdateFechamentoMedicoService from "../services/UpdateFechamentoMedicoService";
import DeleteFechamentoMedicosService from "../services/DeleteFechamentoMedicoService";

export default class MedicoFechamentoController{

    // public async index(request: Request, response: Response): Promise<Response>{

    //     const listFechamentoMedico = new ListMedicoFechamentoServices();
    //     const fechamentoMedico = await listFechamentoMedico.execute();
    //     return response.json(fechamentoMedico);
    // }

    public async create(request: Request, response: Response): Promise<Response>{

        const { medico_id,valor,exame_id  } = request.body;
        const createFechamentoMedicos = new CreateFechamentoMedicoService();
        const fechamentoMedicos = await createFechamentoMedicos.execute({
                medico_id,
                valor,
                exame_id
        });

        return response.json(fechamentoMedicos);
    }


  public async update(request: Request, response: Response): Promise<Response>{

   // console.log('testees');


        const { medico_id,valor,exame_id } = request.body;
        const { id } = request.params;
        const updateFechamentoMedico = new UpdateFechamentoMedicoService();

        const Medicos = await updateFechamentoMedico.execute({
            id,
            medico_id,
            valor,
            exame_id
        });

        return response.json(Medicos);
    }

    public async show(request: Request, response: Response): Promise<Response>{

        const { medico_id } = request.params;
        //console.log(medico_id+" passou no controller")
        const showFechamentoMedico = new ListMedicoFechamentoServices();
        const fechamentoMedico = await showFechamentoMedico.execute({ medico_id })



        return response.json(fechamentoMedico);

    }

   public async delete(request: Request, response: Response): Promise<Response>{

        const { id } = request.params;
        const deleteMedicos = new DeleteFechamentoMedicosService();
        await deleteMedicos.execute({ id })

        return response.json([]);
    }

 }
