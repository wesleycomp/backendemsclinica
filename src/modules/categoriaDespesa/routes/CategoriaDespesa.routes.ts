import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';
import CategoriaDespesaController from '../controllers/CategoriaDespesaController';

const categoriaDespesaRouter = Router();
const controller = new CategoriaDespesaController();

// 📌 Listar todas
categoriaDespesaRouter.get('/', isAuthenticated, controller.index);

// 📌 Buscar por ID
categoriaDespesaRouter.get(
  '/:id',
  isAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  controller.show,
);

// 📌 Criar
categoriaDespesaRouter.post(
  '/',
  isAuthenticated,
  celebrate({
    [Segments.BODY]: {
      nome: Joi.string().trim().required(),
      codigo: Joi.string().allow(null, ''),
      ativo: Joi.boolean().default(true),
    },
  }),
  controller.create,
);

// 📌 Atualizar
categoriaDespesaRouter.put(
  '/:id',
  isAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      nome: Joi.string().trim().required(),
      codigo: Joi.string().allow(null, ''),
      ativo: Joi.boolean().required(),
    },
  }),
  controller.update,
);

// 📌 Deletar
categoriaDespesaRouter.delete(
  '/:id',
  isAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  controller.delete,
);

export default categoriaDespesaRouter;
