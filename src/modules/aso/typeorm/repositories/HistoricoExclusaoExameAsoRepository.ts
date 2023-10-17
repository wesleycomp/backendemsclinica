import { EntityRepository, Repository } from 'typeorm'
import HistoricoExclusaoExameAso from '../entities/HistoricoExclusaoExameAso'
const fs = require('fs');

@EntityRepository(HistoricoExclusaoExameAso)
export class HistoricoExclusaoExameAsoRepository extends Repository<HistoricoExclusaoExameAso>{

    /*
    public async findByName(name: string): Promise<HistoricoExclusaoExameAso | undefined>{
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
*/
}
export default HistoricoExclusaoExameAsoRepository;
