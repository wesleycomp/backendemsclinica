import { Router } from 'express';
import multer from 'multer';
import ImportFechamentoController from '../controllers/ImportFechamentoController';

const upload = multer({ storage: multer.memoryStorage() });
const routes = Router();

const controller = new ImportFechamentoController();

/**
 * POST /fechamento/import
 * Form-data:
 *  - file: (arquivo .xlsx)
 * Query (opcional):
 *  - dryRun=true|false  (só valida, não grava)
 */
routes.post(
  '/import',
  upload.single('file'),
  (req, res) => controller.handle(req, res),
);

export default routes;
