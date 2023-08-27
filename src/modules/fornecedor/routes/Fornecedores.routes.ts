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
                        [Segments.BODY]:{
                                nome: Joi.string().uppercase().required(),
                                cnpj: Joi.string().required(),
                                inscricaoestadual: Joi.string().required(),
                                inscricaomunicipal: Joi.string().required(),
                                endereco: Joi.string().required(),
                                telefone: Joi.string().required(),
                                email: Joi.string().required(),
                                responsavel: Joi.string().required(),
                                esocial: Joi.boolean().required(),
                                convenio: Joi.boolean().required(),

                         },
                    }),
                    fornecedorsController.create
                )

fornecedorsRouter.put(
                    '/:id',
                    isAuthenticated,
                    celebrate({
                            [Segments.BODY]:{
                                id: Joi.string().required(),
                                nome: Joi.string().uppercase().required(),
                                cnpj: Joi.string().required(),
                                inscricaoestadual: Joi.string().required(),
                                inscricaomunicipal: Joi.string().required(),
                                endereco: Joi.string().required(),
                                telefone: Joi.string().required(),
                                email: Joi.string().required(),
                                responsavel: Joi.string().required(),
                                esocial: Joi.boolean().required(),
                                convenio: Joi.boolean().required(),
                                created_at: Joi.string().required(),
                                updated_at: Joi.string().required(),
                            },
                            [Segments.PARAMS]:{
                                id: Joi.string().uuid().required(),
                            },
                        }),
                    fornecedorsController.update
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
