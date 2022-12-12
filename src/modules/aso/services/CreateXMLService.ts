import { getCustomRepository } from "typeorm";
import Aso from "../typeorm/entities/Aso";
import { AsosRepository } from "../typeorm/repositories/AsosRepository";
import AppError from '@shared/errors/AppError';

var builder = require('xmlbuilder');
const fs = require('fs');

const Buffer = require('buffer').Buffer

var SignedXml = require('xml-crypto').SignedXml
//var FileKeyInfo = require('xml-crypto').FileKeyInfo
const { X509Certificate } = require('crypto')
const soapRequest = require('easy-soap-request');

interface IExameAso {
    aso_id: string;

}

class CreateXMLService {

    public async execute({ aso_id }: IExameAso): Promise<Aso | undefined> {

        //instaciou o repositorio para ter acesso aos metodos(save, delete... etc)
        const examesAsoRepository = getCustomRepository(AsosRepository);
        const dadosAso = await examesAsoRepository.findById(aso_id)
        //var xmlEsocial = builder.create('eSocial', { version: '1.0', encoding: 'UTF-8' })
        var xmlEsocial = builder.create('eSocial', { version: '1.0', encoding: 'UTF-8' })
            .att('xmlns', 'http://www.esocial.gov.br/schema/lote/eventos/envio/v1_1_1')
            .ele('envioLoteEventos', { 'grupo': '1' })
            .ele('eventos')
            .ele('evento', { 'Id': 'ID1308586460000002022111915322000001' })
            .ele('eSocial', { 'xmlns': 'http://www.esocial.gov.br/schema/evt/evtMonit/v_S_01_00_00' })
            //.att('grupo', '1')// 1- evento tabelas 2- evento n periodicos 3- eventos periodicos
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
            .up()//fecho o Esocial
            .up()//fecho o evento
            .up()//fecho o eventos
            .up()//fecho o envioLoteEventos
            .end({ pretty: true }); //fechso eSocial



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

        //const xmlaso = await fs.readFileSync('./xml/arquivoTesteXml.xml', "utf8");


        // var myKey = fs.readFile("./certificado/key.pem", "utf8") //.replace("-----BEGIN ENCRYPTED PRIVATE KEY-----", "").replace("-----END ENCRYPTED PRIVATE KEY-----", "").trim();
        // console.log("My key is: ", myKey);
        try {

            console.log('passou aki 1')
            var sig = new SignedXml();

            console.log('passou aki 2')
            sig.signingKey = fs.readFileSync('./certificado/mycaservercertkey.pem') //fs.readFileSync("./certificado/certificado.pem", { encoding: "utf8" })

            // sig.keyInfoProvider = new FileKeyInfo('./certificado/mycaservercertkey.pem');

            const x509 = new X509Certificate(fs.readFileSync('./certificado/cag.pem'));
            // console.log(x509.publicKey)

            const cert = x509.toString().replace('-----BEGIN CERTIFICATE-----', '').trim().replace('-----END CERTIFICATE-----', '').trim().replace(/(\r\n\t|\n|\r\t)/gm, "");

            sig.keyInfoProvider = {

                getKeyInfo: function () {
                    return "<X509Data><X509Certificate>" + cert + "</X509Certificate></X509Data>";
                }

            };

            sig.canonicalizationAlgorithm = 'http://www.w3.org/TR/2001/REC-xml-c14n-20010315'
            sig.signatureAlgorithm = 'http://www.w3.org/2001/04/xmldsig-more#rsa-sha256'; // set signing algorithme
            sig.addReference("/*", ['http://www.w3.org/2000/09/xmldsig#enveloped-signature', 'http://www.w3.org/TR/2001/REC-xml-c14n-20010315'], 'http://www.w3.org/2001/04/xmlenc#sha256');

            sig.computeSignature(xmlEsocial)
            console.log('passou aki 4')
            //fs.writeFileSync("./xml/arquivoTesteXml.xml", sig.getSignedXml())
            fs.writeFileSync('./xml/arquivoTesteXml2.xml', sig.getSignedXml());
            console.log('passou aki final gerar xml')
            // example data    XXXXXXXXXXXXX   TRANSMISSAO XXXXXXXXSXXXXXXXXXXXXXXXXXX
            const url = 'https://webservices.producaorestrita.esocial.gov.br/servicos/empregador/enviarloteeventos/WsEnviarLoteEventos.svc?singleWsdl';
            const sampleHeaders = {
                'user-agent': 'sampleTest',
                'Content-Type': 'text/xml;charset=UTF-8',
                'soapAction': 'https://graphical.weather.gov/xml/DWMLgen/wsdl/ndfdXML.wsdl#LatLonListZipCode',
            };
            const xml = fs.readFileSync('./xml/arquivoTesteXml.xml', 'utf-8');

            // usage of module
            (async () => {
                const { response } = await soapRequest({ url: url, headers: sampleHeaders, xml: xml }); // Optional timeout parameter(milliseconds)
                const { headers, body, statusCode } = response;
                console.log(headers);
                console.log(body);
                console.log(statusCode);
            })();

            console.log('passou aki final envio lote xml')

        } catch (e) {
            console.log(e);
        }



        return xmlEsocial;
    }
}

export default CreateXMLService;
