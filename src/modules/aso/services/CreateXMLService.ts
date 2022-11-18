import { getCustomRepository } from "typeorm";
import Aso from "../typeorm/entities/Aso";
import { AsosRepository } from "../typeorm/repositories/AsosRepository";
import AppError from '@shared/errors/AppError';
import { type } from "os";
var builder = require('xmlbuilder');

interface IExameAso{
    aso_id: string;
}
class CreateXMLService{

    public async execute({aso_id}: IExameAso): Promise<Aso | undefined>{

        //instaciou o repositorio para ter acesso aos metodos(save, delete... etc)
        const examesAsoRepository = getCustomRepository(AsosRepository);

        const dadosAso= await examesAsoRepository.findById(aso_id)

        var xml = builder.create('root')
                .ele('xmlbuilder')
                    .ele('repo', {'type': 'git'}, 'git://github.com/oozcitak/xmlbuilder-js.git')
                .end({ pretty: true});


        var xmlEsocial = builder.create('eSocial', {version: '1.0', encoding: 'UTF-8'})
            .att('xmlns', 'http://www.esocial.gov.br/schema/evt/')
            .ele('Signature',{'xmlns': 'http://www.w3.org/2000/09/xmldsig#'})
            .ele('SignedInfo')
            .ele('CanonicalizationMethod',{'Algorithm': 'http://www.w3.org/TR/2001/REC-xml-c14n20010315'}).up()
            .ele('SignatureMethod',{'Algorithm': 'http://www.w3.org/2001/04/xmldsig-more#rsasha256'}).up()
            .ele('Reference',{'URI': ''})
            .ele('Transforms')
                .ele('Transform',{'Algorithm': 'http://www.w3.org/2000/09/xmldsig#envelopedsignature'}).up()
                .ele('Transform',{'Algorithm': 'http://www.w3.org/TR/2001/REC-xml-c14n-20010315'}).up()
            .up()
            .ele('DigestMethod',{'Algorithm': 'http://www.w3.org/2001/04/xmlenc#sha256'}).up()
            .ele('DigestValue','CFJEIy1dUko99nNUW/ICvG9ZNoij0o9IOhdP6Nt1j1k=').up()
            .up()
            .up()
            .ele('SignatureValue','...').up()
            .ele('KeyInfo')
                .ele('X509Data')
                    .ele('X509Certificate','...').up()
                .up()
            .up()
            .end({ pretty: true});
console.log(xmlEsocial);

        // console.log(dadosAso)

      //  if(exameExists){
      //      throw new AppError('Exame ja existente')
      //  }
        // const examesAso = examesAsoRepository.create({
        //  aso_id
        // });

      //  await examesAsoRepository.save(examesAso);
        return dadosAso;
    }
}

export default CreateXMLService;
