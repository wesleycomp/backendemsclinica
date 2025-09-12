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
var builder = require('xmlbuilder');
var fs = require('fs');
var Buffer = require('buffer').Buffer;
var SignedXml = require('xml-crypto').SignedXml;
//var FileKeyInfo = require('xml-crypto').FileKeyInfo
var X509Certificate = require('crypto').X509Certificate;
var soapRequest = require('easy-soap-request');
var CreateTxt2Tecnospeed = /** @class */ (function () {
    function CreateTxt2Tecnospeed() {
    }
    CreateTxt2Tecnospeed.prototype.execute = function (_a) {
        var aso_id = _a.aso_id;
        return __awaiter(this, void 0, void 0, function () {
            var examesAsoRepository, dadosAso, data, url_1, sampleHeaders_1, txt2_1;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        examesAsoRepository = (0, typeorm_1.getCustomRepository)(AsosRepository_1.AsosRepository);
                        return [4 /*yield*/, examesAsoRepository.findById(aso_id)
                            //console.log(dadosAso)
                            //CRIA A PASTA DOS XML
                            //      fs.mkdir('./tecnospeedTxts', { recursive: true }, (err: any) => {
                            //          if (err) throw err;
                            //      console.log('a pasta foi criada!');
                            //   });
                            // GERA O ARQUIVO TXT2
                            // Se for um CNPJ deve ser informada apenas a Raiz/Base de oito posições, exceto se natureza jurídica de administração pública direta federal ([101-5], [104-0], [107-4], [116-3], situação em que o campo deve ser preenchido com o CNPJ completo (14 posições).
                            // Validação: Se {tpInsc} for igual a [1], deve ser um número de CNPJ válido. Se {tpInsc} for igual a [2], deve ser um CPF válido.
                            // CNPJ EMS: 30858646000175
                        ];
                    case 1:
                        dadosAso = _b.sent();
                        data = 'INCLUIRS2220\r\n' +
                            'indRetif_4=1\r\n' +
                            'nrRecibo_5=\r\n' +
                            'tpAmb_6=1\r\n' +
                            'procEmi_7=1\r\n' +
                            'verProc_8=ID1308586460000002022111915322000001\r\n' +
                            'tpInsc_10=1\r\n' +
                            'nrInsc_11=30858646000175\r\n' +
                            'cpfTrab_13=99999999999\r\n' +
                            'matricula_15=999999\r\n' +
                            'codCateg_49=\r\n' +
                            'tpExameOcup_42=\r\n' +
                            'dtAso_17=2022-03-11\r\n' +
                            'resAso_19=1\r\n' +
                            'nmMed_38=Nome do Medico da Silva\r\n' +
                            'nrCRM_40=000\r\n' +
                            'ufCRM_41=TO\r\n' +
                            'cpfResp_45=99999999999\r\n' +
                            'nmResp_46=Nome do Medico Responsavel\r\n' +
                            'nrCRM_50=111\r\n' +
                            'ufCRM_51=TO\r\n' +
                            '\r\n' +
                            'INCLUIREXAME_60\r\n' +
                            'dtExm_21=2022-03-11\r\n' +
                            'procRealizado_22=0069\r\n' +
                            'obsProc_23=\r\n' +
                            'ordExame_25=1\r\n' +
                            'indResult_28=1\r\n' +
                            'SALVAREXAME_60\r\n' +
                            '\r\n' +
                            'SALVARS2220\r\n';
                        // const data = 'Testando \r\n a criação\r\n de arquivos';
                        fs.writeFile('./tecnospeedTxts/arquivoTeste.Tx2', data, function (err) {
                            if (err)
                                throw err;
                        });
                        try {
                            url_1 = 'https://webservices.envio.esocial.gov.br/servicos/empregador/enviarloteeventos/WsEnviarLoteEventos.svc';
                            sampleHeaders_1 = {
                                'user-agent': 'sampleTest',
                                'Content-Type': 'text/xml;charset=UTF-8',
                                'soapAction': 'https://graphical.weather.gov/xml/DWMLgen/wsdl/ndfdXML.wsdl#LatLonListZipCode',
                            };
                            txt2_1 = fs.readFileSync('./xml/arquivoTesteXml.Txt2', 'utf-8');
                            // usage of module
                            (function () { return __awaiter(_this, void 0, void 0, function () {
                                var response, headers, body, statusCode;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, soapRequest({ url: url_1, headers: sampleHeaders_1, txt: txt2_1 })];
                                        case 1:
                                            response = (_a.sent()).response;
                                            headers = response.headers, body = response.body, statusCode = response.statusCode;
                                            console.log(headers);
                                            console.log(body);
                                            console.log(statusCode);
                                            return [2 /*return*/];
                                    }
                                });
                            }); })();
                            console.log('passou aki final envio lote xml');
                        }
                        catch (e) {
                            console.log(e);
                        }
                        return [2 /*return*/, data];
                }
            });
        });
    };
    return CreateTxt2Tecnospeed;
}());
exports.default = CreateTxt2Tecnospeed;
