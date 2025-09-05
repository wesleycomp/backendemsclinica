// src/shared/http/routes/fechamento.routes.ts
import { Router } from 'express';
import multer from 'multer';
import ImportFechamentoController from '@modules/fechamento/controllers/ImportFechamentoController';

const routes = Router();
const upload = multer(); // memória
const controller = new ImportFechamentoController();

// campo do FormData deve ser "file"
routes.post('/import', upload.single('file'), controller.import.bind(controller));

export default routes;
