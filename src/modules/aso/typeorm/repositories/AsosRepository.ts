import { EntityRepository, Repository } from 'typeorm'
import Aso from '../entities/Aso'
const fs = require('fs');

@EntityRepository(Aso)
export class AsosRepository extends Repository<Aso>{

    public async findByName(name: string): Promise<Aso | undefined>{
        const aso = await this.findOne({
            where: {
                name,
            }
        })
        return aso;
    }

    public async findById(id: string): Promise<Aso | undefined> {
        const aso = await this.findOne(id,{
            relations: ['empresa','tipoaso','medico','paciente','tipopagamento']
        });
        return aso;
    }

    public async findAllFichaExameById(id: string): Promise<Aso | undefined> {
        const aso = await this.findOne(id,{
           relations: ['empresa','tipoaso','medico','paciente','paciente.funcao','tipopagamento']
      });
        return aso;
    }

    public async findAll(): Promise<Aso[]> {
        const aso = await this.find({ where: {
               ativo: true
            },
          relations: ['empresa','tipoaso','medico','paciente','paciente.funcao','tipopagamento']
        });
//console.log(aso)
        return aso;
    }

//    public async findOne(id: string): Promise<Aso> {
//         const aso = await this.find({ where: {
//                id: id
//             },

//         });
//         return aso;
//     }

    // public async findXML(): Promise<String | undefined> {
    //     const xmlaso = await fs.readFile('./xml/arquivoTesteXml.xml', "utf8");

    //                 console.log(xmlaso)

    //     return xmlaso;
    // }

}
export default AsosRepository;
