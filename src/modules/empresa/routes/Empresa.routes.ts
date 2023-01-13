import { Router } from 'express'
import EmpresaController from '../controllers/EmpresaController';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '../../../shared/http/middlewares/isAuthenticated';

const empresasRouter = Router();
const empresasController = new EmpresaController();

empresasRouter.get('/', isAuthenticated, empresasController.index)

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
empresasRouter.post(
                    '/',
                    isAuthenticated,
                    celebrate({
                        [Segments.BODY]:{
                                nome: Joi.string().required(),
                                cnpj: Joi.string().required(),
                                cpf:  Joi.string().allow('', null).default(''),
                                ideEmpregador: Joi.string().allow('', null).default(''),
                                inscricaoestadual: Joi.string().allow('', null).default(''),
                                inscricaomunicipal: Joi.string().allow('', null).default(''),
                                endereco: Joi.string().required(),
                                telefone: Joi.string().required(),
                                email: Joi.string().required(),
                                responsavel: Joi.string().required(),
                                esocial: Joi.boolean().required(),
                                convenio: Joi.boolean().required(),
                                observacao:Joi.string().allow('', null).default('')
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
                                nome: Joi.string().required(),
                                cnpj: Joi.string().required(),
                                cpf: Joi.string().allow('', null),
                                ideEmpregador: Joi.string().allow('', null),
                                inscricaoestadual: Joi.string().allow('', null),
                                inscricaomunicipal: Joi.string().allow('', null),
                                endereco: Joi.string().required(),
                                telefone: Joi.string().required(),
                                email: Joi.string().required(),
                                responsavel: Joi.string().required(),
                                esocial: Joi.boolean(),
                                convenio: Joi.boolean(),
                                created_at: Joi.string().required(),
                                updated_at: Joi.string().required(),
                                observacao:Joi.string().allow('', null).default('')
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
