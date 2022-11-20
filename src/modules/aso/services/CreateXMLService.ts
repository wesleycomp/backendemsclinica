import { getCustomRepository } from "typeorm";
import Aso from "../typeorm/entities/Aso";
import { AsosRepository } from "../typeorm/repositories/AsosRepository";
import AppError from '@shared/errors/AppError';
import { type } from "os";
var builder = require('xmlbuilder');
const fs = require('fs');
var pem = require('pem')
var SignedXml = require('xml-crypto').SignedXml
var myKeyInfo = require('xml-crypto').myKeyInfo

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
            .att('xmlns', 'http://www.esocial.gov.br/schema/lote/eventos/envio/vx_x_x')
            .att('grupo', '1')// 1- evento tabelas 2- evento n periodicos 3- eventos periodicos
            .ele('evtMonit', {'Id': 'ID1308586460000002022111915322000001'} )//ja esta com o ID ok-- falta acrescentar autincrement nos 6 ultimos digitos
                .ele('ideEvento')
                    .ele('indRetif','1').up()
                    .ele('tpAmb','9').up() //1=producao 2-preproducao dados reais 3-pre-producao dados ficticios 6-homologacao 7-validacao 8-testes 9-desenvolvimento
                    .ele('procEmi','1').up() // 1-aplicativo do empregador 2-aplicativo web
                    .ele('verProc','v1.000').up() //versao do aplicativo emissor
                .up()
                .ele('ideEmpregador')
                    .ele('tpInsc','1').up()
                    .ele('nrInsc','99999999999').up()
                .up()
                .ele('ideTransmissor')
                    .ele('tpInsc','1').up()
                    .ele('nrInsc','99999999999').up()
                .up()
                .ele('ideVinculo')
                    .ele('cpfTrab','88888888888').up()
                    .ele('matricula','000999_FL09999488800999').up()
                .up()
                .ele('exMedOcup')
                .ele('tpExameOcup','1').up()
                    .ele('aso')
                        .ele('dtAso','2022-03-11').up()
                            .ele('exame')
                                .ele('dtExm','2022-03-11').up()
                                .ele('procRealizado','0069').up()
                            .up()//fecha o exame
                                        .ele('medico')//medico realizou o exame
                                            .ele('nmMed','Jose do Teste').up()
                                            .ele('nrCRM','143.546').up()
                                            .ele('ufCRM','SP').up()
                                        .up()//fecho medico
                    .up()//fecha aso
                            .ele('respMonit')//medico responsavel pela pcmso
                                .ele('cpfResp','77777777777').up()
                                .ele('nmResp','Fernando do Teste').up()
                                .ele('nrCRM','99999').up()
                                .ele('ufCRM','SP').up()
                            .up()//fecho o medico responsavel
                .up()//fecho o exMedOcup
            .up()//fecho o evtMonit
            .ele('Signature',{'xmlns': 'http://www.w3.org/2000/09/xmldsig#'}) //OK
                .ele('SignedInfo')//OK
                .ele('CanonicalizationMethod',{'Algorithm': 'http://www.w3.org/TR/2001/REC-xml-c14n20010315'}).up()//OK
                .ele('SignatureMethod',{'Algorithm': 'http://www.w3.org/2001/04/xmldsig-more#rsa-sha256'}).up()//OK
                .ele('Reference',{'URI': ''})//OK
                .ele('Transforms')//OK
                    .ele('Transform',{'Algorithm': 'http://www.w3.org/2000/09/xmldsig#enveloped-signature'}).up()//OK
                    .ele('Transform',{'Algorithm': 'http://www.w3.org/TR/2001/REC-xml-c14n-20010315'}).up()//OK
                .up()
                .ele('DigestMethod',{'Algorithm': 'http://www.w3.org/2001/04/xmlenc#sha256'}).up()//OK
                .ele('DigestValue','CFJEIy1dUko99nNUW/ICvG9ZNoij0o9IOhdP6Nt1j1k=').up()//diferente do modelo
                .up()
                .up()
                .ele('SignatureValue','...').up()//descobir
                    .ele('KeyInfo')
                        .ele('X509Data')
                            .ele('X509Certificate','...').up()//descobrir
                        .up()
                    .up()
            .up()//fecho Signature
        .end({ pretty: true}); //fecho Esocial


       //CRIA A PASTA DOS XML
            fs.mkdir('./xml', { recursive: true }, (err: any) => {
                if (err) throw err;
          //      console.log('a pasta foi criada!');
            });

       //GERA O ARQUIVO XML
       const data=xmlEsocial
        //const data = 'Testando a criação de arquivos';
        fs.writeFile('./xml/arquivoTesteXml.xml', data, (err: any) => {
            if (err) throw err;
     //   console.log('O arquivo foi criado!');
        });

//ASSINA O ARQUIVO XML
const pfx = fs.readFile("./certificado/VIVIANPARRA30858646000175.pfx");
pem.readPkcs12("./certificado/VIVIANPARRA30858646000175.pfx", { p12Password: "12345678" }, (err, cert) => {




//var certificado = cert.cert.toString().replace('-----BEGIN CERTIFICATE-----', '').trim().replace('-----END CERTIFICATE-----', '').trim().replace(/(\r\n\t|\n|\r\t)/gm,"");
 // console.log('testando certificado 1');
  console.log(cert)
  //console.log('testando certificado 2');
 // console.log(cert.cert)
 // console.log('testando certificado 3');

 // const result = cert.cert ? cert.cert.toString() : ''
  console.log(cert.cert)
 // console.log('testando certificado 4');
//  console.log(result)


/*
var sig = new SignedXml()
sig.addReference("//*[local-name(.)='SignedInfo']", ['http://www.w3.org/2000/09/xmldsig#enveloped-signature', 'http://www.w3.org/TR/2001/REC-xml-c14n-20010315'])
sig.canonicalizationAlgorithm = "http://www.w3.org/TR/2001/REC-xml-c14n-20010315"
sig.signingKey = fs.readFileSync('./certificado/ICP-Brasilv2.crt')
sig.keyInfoProvider = new myKeyInfo(certificado)
sig.computeSignature(xml, { location: {reference: "//*[local-name(.)='infEvento']", action: 'after'}})
fs.writeFileSync("./xml/arquivoTesteXml.xml", sig.getSignedXml())
*/
});



      //  await examesAsoRepository.save(examesAso);
        return xmlEsocial;
    }
}

export default CreateXMLService;
