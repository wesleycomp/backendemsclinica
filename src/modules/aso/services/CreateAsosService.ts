import { getCustomRepository } from "typeorm";
import Aso from "../typeorm/entities/Aso";
import { AsosRepository } from "../typeorm/repositories/AsosRepository";
import AppError from '@shared/errors/AppError';


interface IAso{
    dataemissaoaso:Date;
    paciente_id: string;
    empresa_id: string;
    funcao_id: string;
    tipoaso_id: string;
    tipopagamento_id: string;
    medico_id: string;
    resultado: string;
    temexames: boolean;
    transmissaoesocial: boolean;
    ativo: boolean;
}
class CreateAsoService{

    public async execute({dataemissaoaso,paciente_id,empresa_id,funcao_id,tipoaso_id,tipopagamento_id,medico_id,resultado,temexames,transmissaoesocial,ativo}: IAso): Promise<Aso>{

        //instaciou o repositorio para ter acesso aos metodos(save, delete... etc)
    const asoRepository = getCustomRepository(AsosRepository);

      //const exameExists= await asoRepository.findByName(name)

      //  if(exameExists){
      //      throw new AppError('Exame ja existente')
      //  }

        const aso = asoRepository.create({
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
            ativo
        });

        await asoRepository.save(aso);
        return aso;
    }
}

export default CreateAsoService;
