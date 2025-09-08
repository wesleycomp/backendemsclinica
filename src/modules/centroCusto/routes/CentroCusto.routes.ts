import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';
import CentroCustoController from '../controllers/CentroCustoController';

const router = Router();
const ctrl = new CentroCustoController();

router.get('/', isAuthenticated, ctrl.index);

router.get(
  '/:id',
  isAuthenticated,
  celebrate({ [Segments.PARAMS]: { id: Joi.string().uuid().required() } }),
  ctrl.show,
);

router.post(
  '/',
  isAuthenticated,
  celebrate({
    [Segments.BODY]: {
      nome: Joi.string().trim().required(),
      codigo: Joi.string().allow('', null),
      ativo: Joi.boolean().default(true),
    },
  }),
  ctrl.create,
);

router.put(
  '/:id',
  isAuthenticated,
  celebrate({
    [Segments.PARAMS]: { id: Joi.string().uuid().required() },
    [Segments.BODY]: {
      nome: Joi.string().trim().required(),
      codigo: Joi.string().allow('', null),
      ativo: Joi.boolean().required(),
    },
  }),
  ctrl.update,
);

router.delete(
  '/:id',
  isAuthenticated,
  celebrate({ [Segments.PARAMS]: { id: Joi.string().uuid().required() } }),
  ctrl.delete,
);

export default router;
