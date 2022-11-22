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

interface IExameAso{
    aso_id: string;
}

class CreateXMLService{

    public async execute({aso_id}: IExameAso): Promise<Aso | undefined>{
        //instaciou o repositorio para ter acesso aos metodos(save, delete... etc)
        const examesAsoRepository = getCustomRepository(AsosRepository);
        const dadosAso= await examesAsoRepository.findById(aso_id)

        // var xml = builder.create('root')
        //         .ele('xmlbuilder')
        //             .ele('repo', {'type': 'git'}, 'git://github.com/oozcitak/xmlbuilder-js.git')
        //         .end({ pretty: true});

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
        .end({ pretty: true}); //fecho Esocial


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

console.log('inicio')
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

// console.log(xmlEsocial)

// Convert string to buffer
////const xmlEms = Buffer.from(asoXml);


 //const publicKey =  fs.readFileSync("./certificado/certificado.pem", { encoding: "utf8" });

//console.log(publicKey)

var certtifi="-----BEGIN CERTIFICATE-----\n"+
"MIIHLDCCBRSgAwIBAgIIFSoiEQdSP3QwDQYJKoZIhvcNAQELBQAwWTELMAkGA1UE"+
"BhMCQlIxEzARBgNVBAoTCklDUC1CcmFzaWwxFTATBgNVBAsTDEFDIFNPTFVUSSB2"+
"NTEeMBwGA1UEAxMVQUMgQ0VSVElGSUNBIE1JTkFTIHY1MB4XDTIyMTEwODEyMzQw"+
"MFoXDTIzMTEwODEyMzQwMFowgdYxCzAJBgNVBAYTAkJSMRMwEQYDVQQKEwpJQ1At"+
"QnJhc2lsMQswCQYDVQQIEwJUTzEPMA0GA1UEBxMGUGFsbWFzMR4wHAYDVQQLExVB"+
"QyBDRVJUSUZJQ0EgTUlOQVMgdjUxFzAVBgNVBAsTDjM0NzQ2MDY2MDAwMTQ3MRkw"+
"FwYDVQQLExBWaWRlb2NvbmZlcmVuY2lhMRowGAYDVQQLExFDZXJ0aWZpY2FkbyBQ"+
"SiBBMTEkMCIGA1UEAxMbVklWSUFOIFBBUlJBOjMwODU4NjQ2MDAwMTc1MIIBIjAN"+
"BgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAi5U27/ZZG0WacbkqIDZ5brLc5DAg"+
"pqLEMZHyf++Zcnfu86hYXkJsKfkYTdwea9dNYHzdAd4RARhSGgRxvA+oZHJ7Ahun"+
"w3rTEPZX2HjBR8+lTL7RXJKGNZGoSKGJpuJPv7sNfqshXDKo8uPj2HOYbAprpqcZ"+
"lufm3ORZUpCfZyJV75f1MFz1UPWuGTlbdyBAEXFOhEY833dBuMMEzOIMlGi96cjz"+
"o+mZFoZ25+oc+0Jcq9M3XvyVxZc4B+rYLSW6zixBMzifz1N77e8Zt7+4WG7QNAsL"+
"LTOrDJQbS+USYR45TDFxI8foiZByIEyOdcTNKdHp2n9JD7BxEe+06yo57QIDAQAB"+
"o4ICeDCCAnQwHwYDVR0jBBgwFoAUP9NcqRlN14gWLZgMrwre4U8kFrAwWQYIKwYB"+
"BQUHAQEETTBLMEkGCCsGAQUFBzAChj1odHRwOi8vY2NkLmFjc29sdXRpLmNvbS5i"+
"ci9sY3IvYWMtY2VydGlmaWNhbWluYXMtc21pbWUtdjUucDdiMIGqBgNVHREEgaIw"+
"gZ+BFnZpdmlwYXJyYW1lZEBnbWFpbC5jb22gFwYFYEwBAwKgDhMMVklWSUFOIFBB"+
"UlJBoBkGBWBMAQMDoBATDjMwODU4NjQ2MDAwMTc1oDgGBWBMAQMEoC8TLTE1MDIx"+
"OTg5MDE0NjE5MjAxMDgwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMKAXBgVgTAED"+
"B6AOEwwwMDAwMDAwMDAwMDAwYgYDVR0gBFswWTBXBgZgTAECAWAwTTBLBggrBgEF"+
"BQcCARY/aHR0cDovL2NjZC5hY3NvbHV0aS5jb20uYnIvZG9jcy9kcGMtYWMtY2Vy"+
"dGlmaWNhbWluYXMtc21pbWUucGRmMB0GA1UdJQQWMBQGCCsGAQUFBwMCBggrBgEF"+
"BQcDBDCBlgYDVR0fBIGOMIGLMEOgQaA/hj1odHRwOi8vY2NkLmFjc29sdXRpLmNv"+
"bS5ici9sY3IvYWMtY2VydGlmaWNhbWluYXMtc21pbWUtdjUuY3JsMESgQqBAhj5o"+
"dHRwOi8vY2NkMi5hY3NvbHV0aS5jb20uYnIvbGNyL2FjLWNlcnRpZmljYW1pbmFz"+
"LXNtaW1lLXY1LmNybDAdBgNVHQ4EFgQUc5xBOCEoV0XE1mkY5dz804TrVTwwDgYD"+
"VR0PAQH/BAQDAgXgMA0GCSqGSIb3DQEBCwUAA4ICAQBJ3S2kdjnlmQQybLipEe1a"+
"Ged7QPBoGBTbmo3VDB2yhBpod1fPcMivtjOx3LB1kLrL4Wp1K0RI9iOBl1VVr4J+"+
"Jm2usU2sc0rzMvOIEsxewCFjfGhME2aTf7f5kusLkLT2aVVSryGGBfJkvTMBBC6Q"+
"FvQ6eIH+xzoPydX7Wn2rmLORQJXrfuUHTs9aRLovIbJ4gsN5Cc6vigohfAcoPCpk"+
"YuiEQUFimtgcrCUymu36PLWXD+/yTZQunZDUuY6tQcxbw2hx7A3CJS8rjOakmuUA"+
"12is0rpebRNegNUov4mAGDF3aj1x+83s/r+uxwD3XO25YtqhBY8Gx2gZpKmlQtyf"+
"OjKfO/pTUIJfwGcROjWnDaY88zcbrt5s4w1scMZuRh0U4HmmfAtYd9RQFFlJ+e3b"+
"uREZFYZPEmBhW8gjGE6qph+nskN9XVS09eLK5Onue3lYLK1TQjaRIHh0QZS7+4k/"+
"idh+zSdVx8MaL46aMl1pcR/zcWMyXWTjCu65FfSpR8TBaHQobsNQJMMaKnUyp1V5"+
"hrgMwnmErzcV2ds8Wcc0Lo6xBHThixPG+29H8xI7kCNa7EmNVFeHcdOhyu8yy6j+"+
"n2DGKtsNfO5R0d7aTntPL0pQMZJX77a4kLXrvoGq/VPyA0zGUmgTJRlohjpM6sMC"+
"VRZauBfLGR00CULsdq5qiQ=="+
"\n-----END CERTIFICATE-----"


//console.log(certtifi)

var xml = "<library>" +
	            "<book>" +
	              "<name>Harry Potter</name>" +
	            "</book>" +
	          "</library>"

              try{

            console.log('passou aki 1' )

            var sig = new SignedXml();

                sig.addReference("//*[local-name(.)='book']")

                console.log('passou aki 2' )
                sig.signingKey=certtifi //fs.readFileSync('./certificado/certificadoteste.pem') //fs.readFileSync("./certificado/certificado.pem", { encoding: "utf8" })
                //sig.signatureAlgorithm = 'http://www.w3.org/2001/04/xmldsig-more#rsa-sha256'; // set signing algorithme
               // console.log('passou aki 3'+sig.signingKey)
                console.log(sig.signingKey)
                sig.computeSignature(xml)
                console.log('passou aki 4' )
                //fs.writeFileSync("./xml/arquivoTesteXml.xml", sig.getSignedXml())
                fs.writeFile('./xml/arquivoTesteXml.xml', sig.getSignedXml());
               console.log('passou aki final' )

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
