import { Router } from 'express'
import FornecedorController from '../controllers/FornecedoresController';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '../../../shared/http/middlewares/isAuthenticated';

const fornecedorsRouter = Router();
const fornecedorsController = new FornecedorController();

fornecedorsRouter.get('/', isAuthenticated, fornecedorsController.index)

fornecedorsRouter.get(
                    '/:id',
                    isAuthenticated,
                    celebrate({
                        [Segments.PARAMS]:{
                            id: Joi.string().uuid().required(),
                        },
                    }),
                    fornecedorsController.show
                )

fornecedorsRouter.post(
  '/',
  isAuthenticated,
  celebrate({
    [Segments.BODY]: {
      nome: Joi.string().uppercase().required(),
      cnpj: Joi.string().allow(null, ''), // pode ser vazio
      cpf: Joi.string().allow(null, ''),  // caso seja PF
      inscricaoestadual: Joi.string().allow(null, ''),
      inscricaomunicipal: Joi.string().allow(null, ''),
      endereco: Joi.string().allow(null, ''),
      telefone: Joi.string().allow(null, ''),
      email: Joi.string().email().allow(null, ''),
      responsavel: Joi.string().allow(null, ''),
      esocial: Joi.boolean().default(false),
      convenio: Joi.boolean().default(false),
      ehlaboratorio: Joi.boolean().required(),
    },
  }),
  fornecedorsController.create,
)

fornecedorsRouter.put(
  '/:id',
  isAuthenticated,
  celebrate({
    [Segments.BODY]: {
      nome: Joi.string().uppercase().required(),
      cnpj: Joi.string().allow(null, ''),
      cpf: Joi.string().allow(null, ''),
      inscricaoestadual: Joi.string().allow(null, ''),
      inscricaomunicipal: Joi.string().allow(null, ''),
      endereco: Joi.string().allow(null, ''),
      telefone: Joi.string().allow(null, ''),
      email: Joi.string().email().allow(null, ''),
      responsavel: Joi.string().allow(null, ''),
      esocial: Joi.boolean().default(false),
      convenio: Joi.boolean().default(false),
      ehlaboratorio: Joi.boolean().required(),
    },
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  fornecedorsController.update,
)

fornecedorsRouter.delete(
                        '/:id',
                        isAuthenticated,
                        celebrate({
                            [Segments.PARAMS]:{
                                id: Joi.string().uuid().required(),
                            },
                        }),
                        fornecedorsController.delete
                    )

export default fornecedorsRouter;
