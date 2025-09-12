// src/modules/fechamento/controllers/ImportFechamentoController.ts
import { Request, Response } from 'express';
import ImportFechamentoPdfService from '@modules/fechamento/services/ImportFechamentoPdfService';

// coerção robusta de boolean vindos em multipart/form-data
const toBool = (v: any) => {
  if (typeof v === 'boolean') return v;
  if (typeof v === 'string') return ['1', 'true', 'on', 'yes'].includes(v.toLowerCase());
  return !!v;
};

export default class ImportFechamentoController {
  /**
   * NOVO endpoint para PDF
   * POST /fechamento/import/pdf
   */
  async importPdf(req: Request, res: Response) {
    try {
      if (!req.file?.buffer) {
        return res.status(400).json({ ok: false, erro: 'Arquivo (.pdf) é obrigatório no campo "file".' });
      }

      const body = req.body ?? {};

      const empresaId =
        body.empresaId != null && body.empresaId !== ''
          ? String(body.empresaId).trim()
          : undefined;

      const empresaCnpj =
        body.empresaCnpj != null && body.empresaCnpj !== ''
          ? String(body.empresaCnpj).replace(/\D+/g, '')
          : undefined;

      const service = new ImportFechamentoPdfService();

      const rel = await service.execute({
        file: req.file.buffer,
        filename: req.file.originalname,
        empresaId,
        empresaCnpj,
        allowCreateEmpresaIfMissing: toBool(body.allowCreateEmpresaIfMissing),
        allowCreatePacienteIfMissing: toBool(body.allowCreatePacienteIfMissing),
        allowUnknownExam: toBool(body.allowUnknownExam),
        dryRun: toBool(body.dryRun),
      });

      return res.json(rel);
    } catch (e: any) {
      console.error('[ImportFechamento][PDF] erro:', e);
      return res.status(500).json({ ok: false, erro: e?.message ?? String(e) });
    }
  }

  /**
   * (Opcional) manter o antigo para XLSX, caso ainda exista no sistema
   * POST /fechamento/import
   *
   * Se você abandonou XLS, pode remover esse método e a rota.
   */
  // async import(req: Request, res: Response) {
  //   try {
  //     if (!req.file?.buffer) {
  //       return res.status(400).json({ ok: false, erro: 'Arquivo (.xlsx) é obrigatório no campo "file".' });
  //     }
  //     // ... chamada do ImportFechamentoExcelService (antigo)
  //   } catch (e: any) {
  //     console.error('[ImportFechamento][XLSX] erro:', e);
  //     return res.status(500).json({ ok: false, erro: e?.message ?? String(e) });
  //   }
  // }
}
