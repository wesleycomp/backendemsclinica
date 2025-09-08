import { getCustomRepository } from "typeorm";
import { PerguntaFichaClinicaRepository } from "../typeorm/repositories/PerguntaFichaClinicaRepository";
import PerguntaFichaClinica from "../typeorm/entities/PerguntaFichaClinica";



class ListPerguntaFichaClinicaService{

    public async execute(): Promise<PerguntaFichaClinica[] | undefined>{
       //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
        const perguntaFichaClinicaRepository = getCustomRepository(PerguntaFichaClinicaRepository);
        const perguntaFichaClinica = await perguntaFichaClinicaRepository.find();

        return perguntaFichaClinica;
    }
}

export default ListPerguntaFichaClinicaService;
