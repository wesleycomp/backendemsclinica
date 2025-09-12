import { Router } from 'express'
import EmpresaController from '../controllers/EmpresaController';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '../../../shared/http/middlewares/isAuthenticated';

const empresasRouter = Router();
const empresasController = new EmpresaController();

empresasRouter.get('/', isAuthenticated, empresasController.index)

empresasRouter.get('/search', isAuthenticated, empresasController.search); // 👈 novo endpoint
// 📊 listagem agrupada para fechamento (período)
empresasRouter.get('/fechamento/agrupado', isAuthenticated, empresasController.listarAgrupado);
// listar exames detalhados por empresa no período
empresasRouter.get(
  '/:id/exames',
  isAuthenticated,
  empresasController.listarExames
)

empresasRouter.get(
                    '/pesquisaempresaid/:id',
                    isAuthenticated,
                    celebrate({
                        [Segments.PARAMS]:{
                            id: Joi.string().uuid().required(),
                        },
                    }),
                    empresasController.showEmpresaId
                )


empresasRouter.get(
                    '/:id',
                    isAuthenticated,
                    celebrate({
                        [Segments.PARAMS]:{
                            id: Joi.string().uuid().required(),
                        },
                    }),
                    empresasController.show
                )

 empresasRouter.get(
                    '/consulta/:id',
                    isAuthenticated,
                    celebrate({
                        [Segments.PARAMS]:{
                            id: Joi.string().uppercase().required(),
                        },
                    }),
                    empresasController.showEmpresaNome
                )

 empresasRouter.get(
                    '/consultacnpj/:id',
                    isAuthenticated,
                    celebrate({
                        [Segments.PARAMS]:{
                            id: Joi.string().required(),
                        },
                    }),
                    empresasController.showEmpresaCnpj
                )

empresasRouter.post(
                    '/',
                    isAuthenticated,
                    celebrate({
                        [Segments.BODY]:{
                                nome: Joi.string().uppercase().required(),
                                cnpj: Joi.string().required(),
                                cpf:  Joi.string().allow('', null).default(''),
                                inscricaoestadual: Joi.string().allow('', null).default(''),
                                inscricaomunicipal: Joi.string().allow('', null).default(''),
                                endereco: Joi.string().required(),
                                telefone: Joi.string().required(),
                                email: Joi.string().allow('', null).default(''),
                                responsavel: Joi.string().allow('', null).default(''),
                                esocial: Joi.boolean().required(),
                                convenio: Joi.boolean().required(),
                                observacao:Joi.string().uppercase().allow('', null).default(''),
                                empresafora: Joi.string().required()
                         },
                    }),
                    empresasController.create
                )

empresasRouter.put(
                    '/:id',
                    isAuthenticated,
                    celebrate({
                            [Segments.BODY]:{
                                id: Joi.string().required(),
                                nome: Joi.string().uppercase().required(),
                                cnpj: Joi.string().required(),
                                cpf: Joi.string().allow('', null),
                                inscricaoestadual: Joi.string().allow('', null),
                                inscricaomunicipal: Joi.string().allow('', null),
                                endereco: Joi.string().required(),
                                telefone: Joi.string().required(),
                                email: Joi.string().allow('', null).default(''),
                                responsavel: Joi.string().allow('', null).default(''),
                                esocial: Joi.boolean(),
                                convenio: Joi.boolean(),
                                created_at: Joi.string().required(),
                                updated_at: Joi.string().required(),
                                observacao:Joi.string().allow('', null).default(''),
                                empresafora: Joi.string().required()
                            },
                            [Segments.PARAMS]:{
                                id: Joi.string().uuid().required(),
                            },
                        }),
                    empresasController.update
                )

empresasRouter.delete(
                        '/:id',
                        isAuthenticated,
                        celebrate({
                            [Segments.PARAMS]:{
                                id: Joi.string().uuid().required(),
                            },
                        }),
                        empresasController.delete
                    )

export default empresasRouter;
