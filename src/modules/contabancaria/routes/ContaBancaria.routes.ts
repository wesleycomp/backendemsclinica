// src/modules/contaBancaria/routes/ContaBancaria.routes.ts
import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';
import ContaBancariaController from '../controllers/ContaBancariaController';

const router = Router();
const ctrl = new ContaBancariaController();

router.get('/', isAuthenticated, ctrl.index.bind(ctrl));

router.post(
  '/',
  isAuthenticated,
  celebrate({
    [Segments.BODY]: {
      nome: Joi.string().required(),
      agencia: Joi.string().required(),
      numero: Joi.string().required(),
      tipo: Joi.string().allow(null, ''),
    },
  }),
  ctrl.create.bind(ctrl),
);

router.delete(
  '/:id',
  isAuthenticated,
  celebrate({ [Segments.PARAMS]: { id: Joi.string().uuid().required() } }),
  ctrl.delete.bind(ctrl),
);

export default router;
