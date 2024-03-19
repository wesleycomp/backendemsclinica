import { EntityRepository, Like,  Repository } from 'typeorm'
import Aso from '../entities/Aso'
import utils from '@config/utils';
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
            relations: ['empresa','tipoaso','medico','medicoexaminador','paciente','tipopagamento']
        });
        return aso;
    }

    public async findAllFichaExameById(id: string): Promise<Aso | undefined> {
        const aso = await this.findOne(id,{
           relations: ['empresa','tipoaso','medico','medicoexaminador','paciente','paciente.funcao','tipopagamento']
      });
        return aso;
    }

    public async findAll(): Promise<Aso[]> {
        const aso = await this.find({ where: {
               ativo: true
            },
          relations: ['empresa','tipoaso','medico','medicoexaminador','paciente','paciente.funcao','tipopagamento'],
          order:{
                 created_at:"DESC"
            }
        });
//console.log(aso)
        return aso;
    }


   public async searcNomeEmpresa(nomeEmpresa: string): Promise<Aso[]> {
        const aso = await this.find({
            where: {
               ativo: true,
               empresa:{nome: Like('%'+nomeEmpresa+'%')}
            },
          relations: ['empresa','tipoaso','medico','medicoexaminador','paciente','paciente.funcao','tipopagamento'],
          order:{
                 created_at:"DESC"
            }
        });
        return aso;
    }


   public async searcCnpjEmpresa(cnpj: string): Promise<Aso[]> {
        const aso = await this.find({
            where: {
               ativo: true,
               empresa:{cnpj: Like('%'+cnpj+'%')}
            },
          relations: ['empresa','tipoaso','medico','medicoexaminador','paciente','paciente.funcao','tipopagamento'],
          order:{
                 created_at:"DESC"
            }
        });
        return aso;
    }


    public async searcNomePaciente(nomePaciente: string): Promise<Aso[]> {
        const aso = await this.find({
            where: {
               ativo: true,
               paciente:{nome: Like('%'+nomePaciente+'%')}
            },
          relations: ['empresa','tipoaso','medico','medicoexaminador','paciente','paciente.funcao','tipopagamento'],
          order:{
                 created_at:"DESC"
            }
        });
        return aso;
    }


    public async searcCpfPaciente(cpf: string): Promise<Aso[]> {

        const aso = await this.find({
            where: {
               ativo: true,
               paciente:{cpf: Like('%'+cpf+'%')}
            },
          relations: ['empresa','tipoaso','medico','medicoexaminador','paciente','paciente.funcao','tipopagamento'],
          order:{
                 created_at:"DESC"
            }
        });

        return aso;
    }

       public async findHistoricoAsosCriadas(): Promise<Aso[] | undefined>{

        const util = new utils()
        var data = util.formatDate(new Date());

        const exameAso = await this.find({
            where: {
            data_criacao: data
            }

         });

         return exameAso;
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
