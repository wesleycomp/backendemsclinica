"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var AsosRepository_1 = require("../typeorm/repositories/AsosRepository");
//import AppError from '@shared/errors/AppError';
//var httpsAgent = require('https-agent');
var https = require('https');
var builder = require('xmlbuilder');
var fs = require('fs');
var Buffer = require('buffer').Buffer;
var soap = require('soap');
var SignedXml = require('xml-crypto').SignedXml;
//var FileKeyInfo = require('xml-crypto').FileKeyInfo
var X509Certificate = require('crypto').X509Certificate;
var soapRequest = require('easy-soap-request');
var CreateXMLService = /** @class */ (function () {
    function CreateXMLService() {
    }
    CreateXMLService.prototype.execute = function (_a) {
        var aso_id = _a.aso_id;
        return __awaiter(this, void 0, void 0, function () {
            var examesAsoRepository, dadosAso, xmlEsocial, sig, x509, cert_1, url, xml;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        examesAsoRepository = (0, typeorm_1.getCustomRepository)(AsosRepository_1.AsosRepository);
                        return [4 /*yield*/, examesAsoRepository.findById(aso_id)
                            //var xmlEsocial = builder.create('eSocial', { version: '1.0', encoding: 'UTF-8' })
                        ];
                    case 1:
                        dadosAso = _b.sent();
                        xmlEsocial = builder.create('eSocial', { version: '1.0', encoding: 'UTF-8' })
                            .att('xmlns', 'http://www.esocial.gov.br/schema/lote/eventos/envio/v1_1_1')
                            .ele('envioLoteEventos', { 'grupo': '1' })
                            .ele('eventos')
                            .ele('evento', { 'Id': 'ID1308586460000002022111915322000001' })
                            .ele('eSocial', { 'xmlns': 'http://www.esocial.gov.br/schema/evt/evtMonit/v_S_01_00_00' })
                            //.att('grupo', '1')// 1- evento tabelas 2- evento n periodicos 3- eventos periodicos
                            .ele('evtMonit', { 'Id': 'ID1308586460000002022111915322000001' }) //ja esta com o ID ok-- falta acrescentar autincrement nos 6 ultimos digitos
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
                            .up() //fecha o exame
                            .ele('medico') //medico realizou o exame
                            .ele('nmMed', 'Jose do Teste').up()
                            .ele('nrCRM', '143.546').up()
                            .ele('ufCRM', 'SP').up()
                            .up() //fecho medico
                            .up() //fecha aso
                            .ele('respMonit') //medico responsavel pela pcmso
                            .ele('cpfResp', '77777777777').up()
                            .ele('nmResp', 'Fernando do Teste').up()
                            .ele('nrCRM', '99999').up()
                            .ele('ufCRM', 'SP').up()
                            .up() //fecho o medico responsavel
                            .up() //fecho o exMedOcup
                            .up() //fecho o evtMonit
                            .up() //fecho o Esocial
                            .up() //fecho o evento
                            .up() //fecho o eventos
                            .up() //fecho o envioLoteEventos
                            .end({ pretty: true });
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
                            console.log('passou aki 1');
                            sig = new SignedXml();
                            console.log('passou aki 2');
                            sig.signingKey = fs.readFileSync('./certificado/mycaservercertkey.pem'); //fs.readFileSync("./certificado/certificado.pem", { encoding: "utf8" })
                            x509 = new X509Certificate(fs.readFileSync('./certificado/cag.pem'));
                            cert_1 = x509.toString().replace('-----BEGIN CERTIFICATE-----', '').trim().replace('-----END CERTIFICATE-----', '').trim().replace(/(\r\n\t|\n|\r\t)/gm, "");
                            sig.keyInfoProvider = {
                                getKeyInfo: function () {
                                    return "<X509Data><X509Certificate>" + cert_1 + "</X509Certificate></X509Data>";
                                }
                            };
                            sig.canonicalizationAlgorithm = 'http://www.w3.org/TR/2001/REC-xml-c14n-20010315';
                            sig.signatureAlgorithm = 'http://www.w3.org/2001/04/xmldsig-more#rsa-sha256'; // set signing algorithme
                            sig.addReference("/*", ['http://www.w3.org/2000/09/xmldsig#enveloped-signature', 'http://www.w3.org/TR/2001/REC-xml-c14n-20010315'], 'http://www.w3.org/2001/04/xmlenc#sha256');
                            sig.computeSignature(xmlEsocial);
                            console.log('passou aki 4');
                            //fs.writeFileSync("./xml/arquivoTesteXml.xml", sig.getSignedXml())
                            fs.writeFileSync('./xml/arquivoTesteXml2.xml', sig.getSignedXml());
                            console.log('passou aki final gerar xm');
                            console.log('passou aki final gerar xml');
                            url = 'https://webservices.producaorestrita.esocial.gov.br/servicos/empregador/enviarloteeventos/WsEnviarLoteEventos.svc?singleWsdl';
                            xml = fs.readFileSync('./xml/arquivoTesteXml.xml', 'utf-8');
                            // const agent = new https.Agent({
                            // ca: fs.readFileSync('./certificado/cadeiaEsocial.pem')
                            // });
                            // var agent = httpsAgent({
                            //   pfx: fs.readFileSync('./certificado/cadeiaEsocial.pem')
                            // });
                            // usage of module
                            // (async () => {
                            //     const { response } = await soapRequest({ url: url, headers: sampleHeaders, xml: xml,  extraOpts: {httpsAgent: agent}, }); // Optional timeout parameter(milliseconds)
                            //     const { headers, body, statusCode } = response;
                            //     console.log(headers);
                            //     console.log(body);
                            //     console.log(statusCode);
                            // })();
                            //    soap.createClientAsync(url,function(err, client) {
                            //              if(err) return console.log(err);
                            //              client.setSecurity(new soap.ClientSSLSecurity(
                            //                fs.readFileSync('./certificado/cadeiaEsocial.pem')
                            //            ));
                            //                  console.log("passou por aqui")
                            //         });
                            console.log('passou aki final envio lote xml... atualizaei pull 455');
                        }
                        catch (e) {
                            console.log(e);
                        }
                        return [2 /*return*/, xmlEsocial];
                }
            });
        });
    };
    return CreateXMLService;
}());
exports.default = CreateXMLService;
