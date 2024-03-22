import { Request , Response } from "express";
import CreateAsoService from "../services/CreateAsosService";
import CreateXMLService from "../services/CreateXMLService";
import CreateTxt2Tecnospeed from "../services/CreateTxt2Tecnospeed";
import DeleteAsoService from "../services/DeleteAsosService";
import ListAsoService from "../services/ListAsosService";
import ShowAsoService from "../services/ShowAsosService";
import ShowFichaExameService from "../services/ShowFichaExameService";
import UpdateAsoService from "../services/UpdateAsosService";
import DeleteExameAsoService from "../services/DeleteExameAsoService";
import DeleteFichaClinicaService from "@modules/fichaclinica/services/DeleteFichaClinicaService";
import ShowHistoricoEdicaoAsoService from "../services/ShowHistoricoEdicaoAsoService";
import ShowAsosService from "../services/ShowAsosService";
import { Console } from "console";
import User from "@modules/users/typeorm/entities/User";
import { bool, boolean, string } from "joi";
import HistoricoAsosExcluidasRepository from "../typeorm/repositories/HistoricoAsosExcluidasRepository";
import CreateHistoricoAsoExcluidaService from "../services/CreateHistoricoAsoExcluidaService";
import ShowExamesAsosService from "../services/ShowExamesAsosService";
import CreatehistoricoExameAsoExcluidoService from "../services/CreatehistoricoExameAsoExcluidoService";
import ShowExameAsoService from "../services/ShowExamesAsosService";
import CreateAsosExcluidasServices from "../services/CreateAsosExcluidasServices"

export default class AsosController{

    public async index(request: Request, response: Response): Promise<Response>{

        const listExame = new ListAsoService();
        const exame = await listExame.execute();

        return response.json(exame);
    }


   public async showAsosExcluidasPeriodo(request: Request, response: Response): Promise<Response>{

        const { datainicio } = request.params;
        const { datafim } = request.params;
        const showExameAso = new ShowExameAsoService();
        const exame = await showExameAso.executeAsosExlcuidasPeriodo(datainicio,datafim)

        return response.json(exame);

        }


 public async showAsosEditadasPeriodo(request: Request, response: Response): Promise<Response>{

        const { datainicio } = request.params;
        const { datafim } = request.params;
        const showExameAso = new ShowExameAsoService();
        const exame = await showExameAso.executeAsosEditadasPeriodo(datainicio,datafim)

        return response.json(exame);

        }


    public async searcNomeEmpresaAso(request: Request, response: Response): Promise<Response>{

        const { nomeempresa } = request.params;
        const listAsos = new ListAsoService();
        const asos = await listAsos.pesquisaAsoNomeEmpresa(nomeempresa);

        return response.json(asos);

    }


        public async searcCnpjEmpresaAso(request: Request, response: Response): Promise<Response>{

        const { cnpj } = request.params;
        const listAsos = new ListAsoService();
        const asos = await listAsos.pesquisaAsoCnpjEmpresa(cnpj);

        return response.json(asos);

    }


        public async searcNomePacienteAso(request: Request, response: Response): Promise<Response>{

        const { nomepaciente } = request.params;
        const listAsos = new ListAsoService();
        const asos = await listAsos.pesquisaAsoNomePaciente(nomepaciente);

        return response.json(asos);

    }


     public async searcCpfPacienteAso(request: Request, response: Response): Promise<Response>{

        const { cpf } = request.params;
        const listAsos = new ListAsoService();
        const asos = await listAsos.pesquisaAsoCpfPaciente(cpf);

        return response.json(asos);

    }


    public async show(request: Request, response: Response): Promise<Response>{

        const { id } = request.params;
        const showExame = new ShowAsoService();
        const exame = await showExame.execute({ id })

        return response.json(exame);
    }

    public async showFichaExame(request: Request, response: Response): Promise<Response>{

        const { id } = request.params;
        const showExame = new ShowFichaExameService();
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

        const {dataemissaoaso,paciente_id,empresa_id,funcao_id,tipoaso_id,medico_id,medicoexaminador_id,resultado,user_edit,tipopagamento_id,transmissaoesocial,ativo,user_id} = request.body;
        const createExame = new CreateAsoService();
        const exame = await createExame.execute({
            dataemissaoaso,
            paciente_id,
            empresa_id,
            funcao_id,
            tipoaso_id,
            medico_id,
            medicoexaminador_id,
            resultado,
            user_edit,
            tipopagamento_id,
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
            medico_id,
            medicoexaminador_id,
            resultado,
            user_edit,
            tipopagamento_id,
            transmissaoesocial,
            ativo,
            user_id,
            motivo

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
            medico_id,
            medicoexaminador_id,
            resultado,
            user_edit,
            tipopagamento_id,
            transmissaoesocial,
            ativo,
            user_id,
            motivo
        });

        return response.json(exame);
    }

   public async delete(request: Request, response: Response): Promise<Response>{

        const { id,user_exclusao,motivo } = request.params;

        const deleteExamesAso = new DeleteExameAsoService()
        const deleteAso = new DeleteAsoService();
        const deleteFichaClinicaAso = new DeleteFichaClinicaService()
        const asoService = new ShowAsoService()
        const historicoAsosExcluidasService = new CreateHistoricoAsoExcluidaService()
        const historicoExameAsoExcluidaService = new CreatehistoricoExameAsoExcluidoService()
        const aso = await asoService.execute({ id });

        const asoExameAsoService = new ShowExamesAsosService();
        const aso_id:string= aso.id
        const exameAso = await asoExameAsoService.execute({ aso_id });

        //popula o objeto com os dados dos exames aso a ser excluida em um laco FOR
        exameAso.forEach((item) => {

                  var aso_id: string = item.aso_id;
                  var exame_id: string = item.exame_id;
                  var ativo: boolean = item.ativo;
                  var created_at: Date = item.created_at;
                  var updated_at: Date = item.updated_at;
                  var valorexamesemdesconto: number = item.valorexamesemdesconto;
                  var valorexame: number = item.valorexame;
                  var valormedico: number = item.valormedico;
                  var valorems: number = item.valorems;
                  var tipopagamento_id: string = item.tipopagamento_id;
                  var user_id: string = item.user_id;
                  var user_desconto: string = item.user_desconto;
                  var desconto: boolean = item.desconto;


        //guarda os dados dos exames da ASO a sereme excluidos na tabela historico__exameaso_excluido
        historicoExameAsoExcluidaService.execute({
                    aso_id,
                    exame_id,
                    ativo,
                    created_at,
                    updated_at,
                    valorexamesemdesconto,
                    valorexame,
                    valormedico,
                    valorems,
                    tipopagamento_id,
                    user_id,
                    user_desconto,
                    desconto,


                })

          });


        //popula o objeto com os dados da aso a ser excluida
        const dataemissaoaso: Date = aso.dataemissaoaso;
        const paciente_id: string = aso.paciente_id;
        const empresa_id: string = aso.empresa_id;
        const funcao_id: string = aso.funcao_id;
        const tipoaso_id: string = aso.tipoaso_id;
        const medico_id: string = aso.medico_id;
         const medicoexaminador_id: string = aso.medicoexaminador_id;
        const resultado: string = aso.resultado;
        const transmissaoesocial: boolean = aso.transmissaoesocial;
        const ativo: boolean = aso.ativo;
        const created_at: Date = aso.created_at;
        const updated_at: Date = aso.updated_at;
        const user_id: string = aso.user_id;
        const user_edit: string = aso.user_edit;
        const codigoaso: Number = aso.codigoaso;
        const tipopagamento_id: string = aso.tipopagamento_id;
        const data_criacao: string = aso.data_criacao;

        //guarda os dados da aso a ser  excluida na tabela historico_aso_excluida
        await historicoAsosExcluidasService.execute({
            aso_id,
            dataemissaoaso,
            paciente_id,
            empresa_id,
            funcao_id,
            tipoaso_id,
            medico_id,
            medicoexaminador_id,
            resultado,
            transmissaoesocial,
            ativo,
            created_at,
            updated_at,
            user_id,
            user_edit,
            codigoaso,
            tipopagamento_id,
            data_criacao,
            user_exclusao,
            motivo
        });



            await deleteExamesAso.deleteExameAso({id})// corrigi
            await deleteFichaClinicaAso.execute({id})
            await deleteAso.execute({id,user_exclusao})
            return response.json([]);



    }


   public async showAsosEditadas(request: Request, response: Response): Promise<Response>{

        const showAsosEditadas= new ShowHistoricoEdicaoAsoService();
        const asosEditadas = await showAsosEditadas.listAsosEditadas()
        return response.json(asosEditadas);
    }

   public async showAsosCriadas(request: Request, response: Response): Promise<Response>{

        const showAsosCriadas= new ShowAsosService();
        const asosCriadas = await showAsosCriadas.listAsosCriadas()
        return response.json(asosCriadas);
    }


    public async showAsosExcluidas(request: Request, response: Response): Promise<Response>{

        const showAsosExcluidas= new ShowAsosService();
        const asosExcluidas = await showAsosExcluidas.listAsosExcluidas()
        return response.json(asosExcluidas);
    }

/*

       public async createAsosExcluidas(request: Request, response: Response): Promise<Response>{

        const {aso_id,user_id,motivo} = request.body;
        const createAsoExcluida = new CreateAsosExcluidasServices();
        const asoExcluida = await createAsoExcluida.execute({
            aso_id,
            user_id,
            motivo
        });

        return response.json(asoExcluida);
    }
*/

 }
