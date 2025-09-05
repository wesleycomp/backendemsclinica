import { Request, Response } from 'express';
// POST /fechamento/import
import ImportFechamentoExcelService from
  '@modules/fechamento/services/ImportFechamentoExcelService';

export async function importFechamento(req, res) {
  const file: Buffer = req.file.buffer; // se usar multer
  const service = new ImportFechamentoExcelService();

  const rel = await service.execute({
    file,
    filename: req.file.originalname,
    allowCreateEmpresaIfMissing: true,
    allowCreatePacienteIfMissing: false, // deixe false se não quiser placeholders
    allowUnknownExam: false,             // true => grava ExameAso com exame_id = null
    dryRun: false,                       // true => não grava, só simula e retorna o relatório
  });

  return res.json(rel);
}
