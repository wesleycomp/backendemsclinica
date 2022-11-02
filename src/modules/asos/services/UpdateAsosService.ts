import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Aso from "../typeorm/entities/Aso";
import { AsosRepository } from "../typeorm/repositories/AsosRepository";

interface IAso{

    id:string,
    dataemissaoaso:Date;
    empresa_id: string;
    tipoexame_id: string;
    tipoaso_id: string;
    medico_id: string;
    resultado: string;
    temexames: boolean;
    transmissaoesocial: boolean;
    ativo: boolean;

}

class UpdateAsoService{

    public async execute({id,dataemissaoaso,empresa_id,tipoexame_id,tipoaso_id,medico_id,resultado,temexames,transmissaoesocial,ativo}: IAso): Promise<Aso>{

            //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
        const asoRepository = getCustomRepository(AsosRepository);
        const aso = await asoRepository.findOne(id);

        if(!aso){
            throw new AppError('Exame não encontrada')
        }

        aso.dataemissaoaso = dataemissaoaso;
        aso.empresa_id = empresa_id;
        aso.tipoexame_id = tipoexame_id;
        aso.tipoaso_id = tipoaso_id;
        aso.medico_id = medico_id;
        aso.resultado = resultado;
        aso.temexames=temexames;
        aso.transmissaoesocial=transmissaoesocial;
        aso.ativo = ativo;

        await asoRepository.save(aso)

        return aso;
    }
}

export default UpdateAsoService;
