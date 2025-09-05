// src/modules/fechamento/controllers/ImportFechamentoController.ts
import { Request, Response } from 'express';
import ImportFechamentoExcelService from '@modules/fechamento/services/ImportFechamentoExcelService';

const toBool = (v: any) =>
  v === true || v === 'true' || v === '1' || v === 1;

export default class ImportFechamentoController {
  async import(req: Request, res: Response) {
    try {
      // garante arquivo
      if (!req.file?.buffer) {
        return res.status(400).json({ ok: false, erro: 'Arquivo (.xlsx) é obrigatório no campo "file".' });
      }

      const body = req.body ?? {};

      // leitura segura (sem .toString() direto)
      const empresaId =
        body.empresaId != null && body.empresaId !== ''
          ? String(body.empresaId).trim()
          : undefined;

      const empresaCnpj =
        body.empresaCnpj != null && body.empresaCnpj !== ''
          ? String(body.empresaCnpj).replace(/\D+/g, '')
          : undefined;

      const service = new ImportFechamentoExcelService();

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
      console.error('[ImportFechamento] erro:', e);
      return res.status(500).json({ ok: false, erro: e?.message ?? String(e) });
    }
  }
}
