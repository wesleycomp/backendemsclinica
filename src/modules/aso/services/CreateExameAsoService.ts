import { getCustomRepository } from "typeorm";
import ExamesAso from "../typeorm/entities/ExamesAso";
import { ExamesAsoRepository } from "../typeorm/repositories/ExamesAsoRepository";
import AppError from '@shared/errors/AppError';


interface IExameAso{
    aso_id: string;
    exame_id: string;
    ativo: boolean;
    usuariocadastro: string;
}
class CreateExameAsoService{

    public async execute({aso_id,exame_id,ativo, usuariocadastro}: IExameAso): Promise<ExamesAso>{

        //instaciou o repositorio para ter acesso aos metodos(save, delete... etc)
    const examesAsoRepository = getCustomRepository(ExamesAsoRepository);

      //  const exameExists= await asoRepository.findByName(name)

      //  if(exameExists){
      //      throw new AppError('Exame ja existente')
      //  }

        const examesAso = examesAsoRepository.create({
         aso_id,exame_id,ativo,usuariocadastro
        });

        await examesAsoRepository.save(examesAso);
        return examesAso;
    }
}

export default CreateExameAsoService;
