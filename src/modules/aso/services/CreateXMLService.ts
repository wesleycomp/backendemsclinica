import { getCustomRepository } from "typeorm";
import Aso from "../typeorm/entities/Aso";
import { AsosRepository } from "../typeorm/repositories/AsosRepository";
import AppError from '@shared/errors/AppError';
import { type } from "os";
import { request } from "express";
var builder = require('xmlbuilder');
const fs = require('fs');
const crypto = require('crypto');
const buffer = require('buffer');
const xml2js = require('xml2js');
var bucket = require('buckets-js');


var SignedXml = require('xml-crypto').SignedXml
var FileKeyInfo = require('xml-crypto').FileKeyInfo

interface IExameAso {
    aso_id: string;

}

class CreateXMLService {


    //   public async creaMyKeyInfote(request: Request, response: Response): Promise<Response>{

    //                return "<X509Data></ X509Data>"
    //   }




    public async execute({ aso_id }: IExameAso): Promise<Aso | undefined> {
        //instaciou o repositorio para ter acesso aos metodos(save, delete... etc)
        const examesAsoRepository = getCustomRepository(AsosRepository);
        const dadosAso = await examesAsoRepository.findById(aso_id)

        // var xml = builder.create('root')
        //         .ele('xmlbuilder')
        //             .ele('repo', {'type': 'git'}, 'git://github.com/oozcitak/xmlbuilder-js.git')
        //         .end({ pretty: true});

        var xmlEsocial = builder.create('eSocial', { version: '1.0', encoding: 'UTF-8' })
            .att('xmlns', 'http://www.esocial.gov.br/schema/lote/eventos/envio/vx_x_x')
            .att('grupo', '1')// 1- evento tabelas 2- evento n periodicos 3- eventos periodicos
            .ele('evtMonit', { 'Id': 'ID1308586460000002022111915322000001' })//ja esta com o ID ok-- falta acrescentar autincrement nos 6 ultimos digitos
            .ele('ideEvento')
            .ele('indRetif', '1').up()
            .ele('tpAmb', '9').up() //1=producao 2-preproducao dados reais 3-pre-producao dados ficticios 6-homologacao 7-validacao 8-testes 9-desenvolvimento
            .ele('procEmi', '1').up() // 1-aplicativo do empregador 2-aplicativo web
            .ele('verProc', 'v1.000').up() //versao do aplicativo emissor
            .up()
            .ele('ideEmpregador')
            .ele('tpInsc', '1').up()
            .ele('nrInsc', '99999999999').up()
            .up()
            .ele('ideTransmissor')
            .ele('tpInsc', '1').up()
            .ele('nrInsc', '99999999999').up()
            .up()
            .ele('ideVinculo')
            .ele('cpfTrab', '88888888888').up()
            .ele('matricula', '000999_FL09999488800999').up()
            .up()
            .ele('exMedOcup')
            .ele('tpExameOcup', '1').up()
            .ele('aso')
            .ele('dtAso', '2022-03-11').up()
            .ele('exame')
            .ele('dtExm', '2022-03-11').up()
            .ele('procRealizado', '0069').up()
            .up()//fecha o exame
            .ele('medico')//medico realizou o exame
            .ele('nmMed', 'Jose do Teste').up()
            .ele('nrCRM', '143.546').up()
            .ele('ufCRM', 'SP').up()
            .up()//fecho medico
            .up()//fecha aso
            .ele('respMonit')//medico responsavel pela pcmso
            .ele('cpfResp', '77777777777').up()
            .ele('nmResp', 'Fernando do Teste').up()
            .ele('nrCRM', '99999').up()
            .ele('ufCRM', 'SP').up()
            .up()//fecho o medico responsavel
            .up()//fecho o exMedOcup
            .up()//fecho o evtMonit
            .end({ pretty: true }); //fecho Esocial


        //CRIA A PASTA DOS XML
        //         fs.mkdir('./xml', { recursive: true }, (err: any) => {
        //             if (err) throw err;
        //       //      console.log('a pasta foi criada!');
        //         });

        //    //GERA O ARQUIVO XML
        //    const data=xmlEsocial
        //     //const data = 'Testando a criação de arquivos';
        //     fs.writeFile('./xml/arquivoTesteXml.xml', data, (err: any) => {
        //         if (err) throw err;
        //  //   console.log('O arquivo foi criado!');
        //     });

        //console.log('inicio')
        //XXXXXXXXXXX  CONFIGURAÇAO DO CERTIFICADO XXXXXXXXXXXX
        // const pem = await PfxToPem.toPem({
        //     path: './certificado/VIVIANPARRA30858646000175.pfx',
        //     password: '12345678'
        // });


        //console.log("Reading File...\n");
        // Reading fileconst asoXml = fs.readFileSync('./xml/arquivoTesteXml.xml','utf-8')
        // console.log(asoXml);
        //


        //const xmlaso = await fs.readFileSync('./xml/arquivoTesteXml.xml', "utf8");


        // var myKey = fs.readFile("./certificado/key.pem", "utf8") //.replace("-----BEGIN ENCRYPTED PRIVATE KEY-----", "").replace("-----END ENCRYPTED PRIVATE KEY-----", "").trim();
        // console.log("My key is: ", myKey);




        try {

            console.log('passou aki 1')
            var sig = new SignedXml();


            //  sig.addReference("//*[local-name(.)='evtMonit']")
            console.log('passou aki 2')
            sig.signingKey = fs.readFileSync('./certificado/certificado.key') //fs.readFileSync("./certificado/certificado.pem", { encoding: "utf8" })
            sig.keyInfoProvider = new FileKeyInfo("./certificado/certificado2.pem")
            sig.canonicalizationAlgorithm = 'http://www.w3.org/TR/2001/REC-xml-c14n-20010315'
            sig.signatureAlgorithm = 'http://www.w3.org/2001/04/xmldsig-more#rsa-sha256'; // set signing algorithme
            sig.addReference("//*[local-name(.)='evtMonit']", ['http://www.w3.org/2000/09/xmldsig#enveloped-signature', 'http://www.w3.org/TR/2001/REC-xml-c14n-20010315'], 'http://www.w3.org/2001/04/xmlenc#sha256');

            // sig.HashAlgorithms='http://www.w3.org/2001/04/xmlenc#sha256'
            // console.log('passou aki 3'+sig.signingKey)N
            // console.log(sig.signingKey)
            //***********************   TESTE PERSONALIZAR ALGORITIMO   ********************************* */
            // SignedXml.CanonicalizationAlgorithms["http://MyTransformation"] =['http://www.w3.org/2000/09/xmldsig#enveloped-signature', 'http://www.w3.org/TR/2001/REC-xml-c14n-20010315']
            // SignedXml.HashAlgorithms["http://myDigestAlgorithm"] = 'http://www.w3.org/2001/04/xmlenc#sha256'

            //  sig.addReference("/*", ["http://MyTransformation"], "http://myDigestAlgorithm")
            sig.computeSignature(xmlEsocial)
            console.log('passou aki 4')
            //fs.writeFileSync("./xml/arquivoTesteXml.xml", sig.getSignedXml())
            fs.writeFileSync('./xml/arquivoTesteXml.xml', sig.getSignedXml());
            console.log('passou aki final')

        } catch (e) {

            console.log(e);
        }




        //var myKey = fs.readFileSync("./certificado/key.pem", "utf8").replace("-----BEGIN RSA PRIVATE KEY-----", "").replace("-----END RSA PRIVATE KEY-----", "").trim();

        //var myKey = await fs.readFileSync("./certificado/key.pem", "utf8").replace("-----BEGIN ENCRYPTED PRIVATE KEY-----", "").replace("-----END ENCRYPTED PRIVATE KEY-----", "").trim();
        //console.log("My key is: ", myKey);


        // Sign the data and returned signature in buffer
        //const sign = crypto.sign("SHA256", xmlEms , myKey);
        // Convert returned buffer to base64
        //const signature = sign.toString('base64');

        // Printing the signature
        //console.log(`Signature:\n\n ${signature}`);


        //ASSINA O ARQUIVO XML
        //const pfx = fs.readFile("./certificado/VIVIANPARRA30858646000175.pfx");
        // console.log('passou aki 2')
        // pem.readPkcs12("./certificado/VIVIANPARRA30858646000175.pfx", { p12Password: "12345678" }, (err:any, cert:any) => {
        // console.log('passou aki 3')
        // //var certificado = cert.cert.toString().replace('-----BEGIN CERTIFICATE-----', '').trim().replace('-----END CERTIFICATE-----', '').trim().replace(/(\r\n\t|\n|\r\t)/gm,"");
        //  // console.log('testando certificado 1');
        //   console.log(cert)
        //   //console.log('testando certificado 2');
        //  // console.log(cert.cert)
        //  // console.log('testando certificado 3');

        //  // const result = cert.cert ? cert.cert.toString() : ''
        //   console.log(cert.cert)
        //  // console.log('testando certificado 4');
        // //  console.log(result)


        // /*
        // var sig = new SignedXml()
        // sig.addReference("//*[local-name(.)='SignedInfo']", ['http://www.w3.org/2000/09/xmldsig#enveloped-signature', 'http://www.w3.org/TR/2001/REC-xml-c14n-20010315'])
        // sig.canonicalizationAlgorithm = "http://www.w3.org/TR/2001/REC-xml-c14n-20010315"
        // sig.signingKey = fs.readFileSync('./certificado/ICP-Brasilv2.crt')
        // sig.keyInfoProvider = new myKeyInfo(certificado)
        // sig.computeSignature(xml, { location: {reference: "//*[local-name(.)='infEvento']", action: 'after'}})
        // fs.writeFileSync("./xml/arquivoTesteXml.xml", sig.getSignedXml())
        // */
        // });
        //  await examesAsoRepository.save(examesAso);
        return xmlEsocial;
    }
}

export default CreateXMLService;
