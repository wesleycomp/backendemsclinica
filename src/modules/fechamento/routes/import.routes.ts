// src/shared/http/routes/fechamento.routes.ts
import { Router } from 'express';
import multer from 'multer';
import ImportFechamentoController from '@modules/fechamento/controllers/ImportFechamentoController';
// import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated'; // se usar auth

const routes = Router();
const upload = multer(); // memória
const controller = new ImportFechamentoController();

/**
 * NOVA rota para PDF
 * (se este router estiver montado em "/fechamento", o caminho final fica:
 *  POST /fechamento/import/pdf )
 */
routes.post(
  '/import/pdf',
  // ensureAuthenticated, // (opcional) autentique antes de receber o arquivo
  upload.single('file'),
  controller.importPdf.bind(controller)
);

/**
 * (Opcional) manter a rota antiga como alias, apontando para o mesmo handler de PDF.
 * Se quiser desativar de vez o XLS, deixe assim:
 */
routes.post(
  '/import',
  // ensureAuthenticated,
  upload.single('file'),
  controller.importPdf.bind(controller)
);

export default routes;
