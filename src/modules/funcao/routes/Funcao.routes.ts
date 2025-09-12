import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';
import FuncoesController from '../controllers/FuncoesController';

const funcoesRouter = Router();
const controller = new FuncoesController();

// Listar
funcoesRouter.get('/', isAuthenticated, controller.index);

// Buscar por ID
funcoesRouter.get(
  '/:id',
  isAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  controller.show,
);

// Criar
funcoesRouter.post(
  '/',
  isAuthenticated,
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().trim().required(),
      cbo: Joi.string().trim().required(),
      ativo: Joi.boolean().default(true),
    },
  }),
  controller.create,
);

// Atualizar
funcoesRouter.put(
  '/:id',
  isAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      name: Joi.string().trim().required(),
      cbo: Joi.string().trim().required(),
      ativo: Joi.boolean().required(),
    },
  }),
  controller.update,
);

// Deletar
funcoesRouter.delete(
  '/:id',
  isAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  controller.delete,
);

export default funcoesRouter;
