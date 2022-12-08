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

class CreateTxt2Tecnospeed {

    public async execute({ aso_id }: IExameAso): Promise<String | undefined> {

        //instaciou o repositorio para ter acesso aos metodos(save, delete... etc)
        const examesAsoRepository = getCustomRepository(AsosRepository);
        const dadosAso = await examesAsoRepository.findById(aso_id)

        console.log(dadosAso)
        //CRIA A PASTA DOS XML
          //      fs.mkdir('./tecnospeedTxts', { recursive: true }, (err: any) => {
          //          if (err) throw err;
          //      console.log('a pasta foi criada!');
          //   });

        // GERA O ARQUIVO TXT2
        // Se for um CNPJ deve ser informada apenas a Raiz/Base de oito posições, exceto se natureza jurídica de administração pública direta federal ([101-5], [104-0], [107-4], [116-3], situação em que o campo deve ser preenchido com o CNPJ completo (14 posições).
        // Validação: Se {tpInsc} for igual a [1], deve ser um número de CNPJ válido. Se {tpInsc} for igual a [2], deve ser um CPF válido.
        // CNPJ EMS: 30858646000175
const data='INCLUIRS2220\r\n'+
'indRetif_4=1\r\n'+
'nrRecibo_5=\r\n'+
'tpAmb_6=1\r\n'+
'procEmi_7=1\r\n'+
'verProc_8=ID1308586460000002022111915322000001\r\n'+
'tpInsc_10=1\r\n'+
'nrInsc_11=30858646000175\r\n'+
'cpfTrab_13=99999999999\r\n'+
'matricula_15=999999\r\n'+
'codCateg_49=\r\n'+
'tpExameOcup_42=\r\n'+
'dtAso_17=2022-03-11\r\n'+
'resAso_19=1\r\n'+
'nmMed_38=Nome do Medico da Silva\r\n'+
'nrCRM_40=000\r\n'+
'ufCRM_41=TO\r\n'+
'cpfResp_45=99999999999\r\n'+
'nmResp_46=Nome do Medico Responsavel\r\n'+
'nrCRM_50=111\r\n'+
'ufCRM_51=TO\r\n'+
'\r\n'+
'INCLUIREXAME_60\r\n'+
'dtExm_21=2022-03-11\r\n'+
'procRealizado_22=0069\r\n'+
'obsProc_23=\r\n'+
'ordExame_25=1\r\n'+
'indResult_28=1\r\n'+
'SALVAREXAME_60\r\n'+
'\r\n'+
'SALVARS2220\r\n'

           // const data = 'Testando \r\n a criação\r\n de arquivos';
            fs.writeFile('./tecnospeedTxts/arquivoTeste.Tx2', data, (err: any) => {
                if (err) throw err;
            });

        try {
            // example data    XXXXXXXXXXXXX   TRANSMISSAO TECNOSPEED XXXXXXXXSXXXXXXXXXXXXXXXXXX
            const url = 'https://webservices.envio.esocial.gov.br/servicos/empregador/enviarloteeventos/WsEnviarLoteEventos.svc';
            const sampleHeaders = {
                'user-agent': 'sampleTest',
                'Content-Type': 'text/xml;charset=UTF-8',
                'soapAction': 'https://graphical.weather.gov/xml/DWMLgen/wsdl/ndfdXML.wsdl#LatLonListZipCode',
            };
           const txt2 = fs.readFileSync('./xml/arquivoTesteXml.Txt2', 'utf-8');

            // usage of module
            (async () => {
                const { response } = await soapRequest({ url: url, headers: sampleHeaders, txt: txt2 }); // Optional timeout parameter(milliseconds)
                const { headers, body, statusCode } = response;
                console.log(headers);
                console.log(body);
                console.log(statusCode);
            })();
            console.log('passou aki final envio lote xml')
        } catch (e) {
            console.log(e);
        }
        return data;
    }
}

export default CreateTxt2Tecnospeed;
