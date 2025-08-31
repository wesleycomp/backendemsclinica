import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';
import DespesaParcelaController from '../controllers/DespesaParcelaController';

const router = Router();
const ctrl = new DespesaParcelaController();

// Listar todas
router.get('/', isAuthenticated, ctrl.index);

// Buscar por ID
router.get(
  '/:id',
  isAuthenticated,
  celebrate({ [Segments.PARAMS]: { id: Joi.string().uuid().required() } }),
  ctrl.show,
);

// Listar por despesa
router.get(
  '/by-despesa/:despesa_id',
  isAuthenticated,
  celebrate({ [Segments.PARAMS]: { despesa_id: Joi.string().uuid().required() } }),
  ctrl.listByDespesa,
);

// Criar
router.post(
  '/',
  isAuthenticated,
  celebrate({
    [Segments.BODY]: {
      despesa_id: Joi.string().uuid().required(),
      fornecedor_id: Joi.string().uuid().required(),
      numero: Joi.number().integer().min(1).required(),
      data_emissao: Joi.date().required(),
      data_vencimento: Joi.date().required(),
      valor_inicial: Joi.number().required(),
      status: Joi.string().valid('ABERTA','PAGA','CANCELADA','VENCIDA').default('ABERTA'),
      observacao: Joi.string().allow('', null),
    },
  }),
  ctrl.create,
);

// Atualizar
router.put(
  '/:id',
  isAuthenticated,
  celebrate({
    [Segments.PARAMS]: { id: Joi.string().uuid().required() },
    [Segments.BODY]: {
      numero: Joi.number().integer().min(1).required(),
     fornecedor_id: Joi.string().uuid().required(),
      vencimento: Joi.date().required(),
      valor: Joi.number().required(),
      status: Joi.string().valid('ABERTA','PAGA','CANCELADA','VENCIDA').required(),
      data_pagamento: Joi.date().allow(null),
      data_emissao: Joi.date().required(),
      valor_inicial: Joi.number().allow(null),
      observacao: Joi.string().allow('', null),
    },
  }),
  ctrl.update,
);

// Excluir
router.delete(
  '/:id',
  isAuthenticated,
  celebrate({ [Segments.PARAMS]: { id: Joi.string().uuid().required() } }),
  ctrl.delete,
);

// Quitar parcela (opcional)
router.post(
  '/:id/pagar',
  isAuthenticated,
  celebrate({
    [Segments.PARAMS]: { id: Joi.string().uuid().required() },
    [Segments.BODY]: {
      data_pagamento: Joi.date().required(),
      valor_pago: Joi.number().required(),
      observacao: Joi.string().allow('', null),
    },
  }),
  ctrl.pagar,
);

export default router;
