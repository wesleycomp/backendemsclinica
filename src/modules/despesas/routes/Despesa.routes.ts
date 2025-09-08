import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';
import DespesaController from '../controllers/DespesaController';

const router = Router();
const ctrl = new DespesaController();

router.get('/', isAuthenticated, ctrl.index);

router.get(
  '/:id',
  isAuthenticated,
  celebrate({ [Segments.PARAMS]: { id: Joi.string().uuid().required() } }),
  ctrl.show,
);

// src/modules/despesas/routes/Despesa.routes.ts
router.put(
  '/:id/baixa',
  isAuthenticated,
  celebrate({
    [Segments.PARAMS]: { id: Joi.string().uuid().required() },
    [Segments.BODY]: {
      data_pagamento: Joi.date().required(),
      conta_bancaria_id: Joi.string().uuid().allow(null, ''),
      observacao: Joi.string().allow(null, ''),
      // novos campos:
      juros: Joi.number().default(0),
      desconto: Joi.number().default(0),
    },
  }),
  ctrl.baixar.bind(ctrl),
);




router.post(
  '/',
  isAuthenticated,
  celebrate({
    [Segments.BODY]: {
      fornecedor_id: Joi.string().uuid().required(),
      centro_custo_id: Joi.string().uuid().allow(null, ''),
      categoria_id: Joi.string().uuid().allow(null, ''),
      descricao: Joi.string().required(),
      documento: Joi.string().allow(null, ''),
      data_emissao: Joi.date().allow(null),
     data_vencimento: Joi.date().allow(null),
     valor_inicial: Joi.number().default(0),
      forma_pagamento_id: Joi.string().uuid().allow(null, ''),
      numero_parcelas: Joi.number().integer().min(1).default(1),
      status: Joi.string().valid('ABERTA','PARCIAL','PAGA','CANCELADA').default('ABERTA'),
    },
  }),
  ctrl.create,
);

// src/modules/despesas/routes/Despesa.routes.ts
router.put(
  '/:id',
  isAuthenticated,
  celebrate({
    [Segments.PARAMS]: { id: Joi.string().uuid().required() },
    [Segments.BODY]: {
      fornecedor_id: Joi.string().uuid().required(),
      centro_custo_id: Joi.string().uuid().allow(null, ''),
      categoria_id: Joi.string().uuid().allow(null, ''),
      descricao: Joi.string().required(),
      documento: Joi.string().allow(null, ''),
      data_emissao: Joi.date().allow(null),
      data_vencimento: Joi.date().allow(null),   // opcional
      valor_inicial_edit: Joi.number().default(0),   // <- sem default!
      forma_pagamento_id: Joi.string().uuid().allow(null, ''),
      numero_parcelas: Joi.number().integer().min(1).optional(),
      status: Joi.string().valid('ABERTA','PARCIAL','PAGA','CANCELADA').optional(),
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
