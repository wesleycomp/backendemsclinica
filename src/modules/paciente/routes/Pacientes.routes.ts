import { Router } from 'express'
import PacientesController from '../controllers/PacientesController';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '../../../shared/http/middlewares/isAuthenticated';

const pacientesRouter = Router();
const pacientesController = new PacientesController();

pacientesRouter.get('/', isAuthenticated, pacientesController.index)


pacientesRouter.get(
                    '/:id',
                    isAuthenticated,
                    celebrate({
                        [Segments.PARAMS]:{
                            id: Joi.string().uuid().required(),
                        },
                    }),
                    pacientesController.show
                )

 pacientesRouter.get(
                    '/consulta/:id',
                    isAuthenticated,
                    celebrate({
                        [Segments.PARAMS]:{
                            id: Joi.string().uppercase().required(),
                        },
                    }),
                    pacientesController.showPacienteNome
                )

 pacientesRouter.get(
                    '/consultacpf/:id',
                    isAuthenticated,
                    celebrate({
                        [Segments.PARAMS]:{
                            id: Joi.string().required(),
                        },
                    }),
                    pacientesController.showPacienteCpf
                )

pacientesRouter.post(
                    '/',
                    isAuthenticated,
                    celebrate({
                        [Segments.BODY]:{
                            empresa_id: Joi.string().required(),
                            funcao_id: Joi.string().required(),
                            categoriatrabalhador_id: Joi.string().required(),
                            matricula: Joi.string().allow('', null).default(''),
                            dataentradaempresa: Joi.string().allow('', null).default('null'),
                            descricaoatividade: Joi.string().allow('', null).default(''),
                            nome: Joi.string().uppercase().required(),
                            cpf: Joi.string().required(),
                            rg: Joi.string().required(),
                            telefone: Joi.string().required(),
                            genero: Joi.string().required(),
                            tiposanguineo: Joi.string().allow('', null).default(''),
                            nacionalidade_id: Joi.string().required(),
                            nis: Joi.string().allow('', null).default(''),
                            ctps: Joi.string().allow('', null).default(''),
                            datanascimento: Joi.string().required(),
                            endereco: Joi.string().allow('', null).default(''),
                            email: Joi.string().allow('', null).default(''),
                        },
                    }),
                    pacientesController.create
                )

pacientesRouter.put(
                    '/:id',
                    isAuthenticated,
                    celebrate({
                            [Segments.BODY]:{

                            id: Joi.string().required(),
                            empresa_id: Joi.string().required(),
                            funcao_id: Joi.string().required(),
                            categoriatrabalhador_id: Joi.string().required(),
                            matricula: Joi.string().allow('', null).default(''),
                            dataentradaempresa: Joi.string().allow('', null).default('null'),
                            descricaoatividade: Joi.string().allow('', null).default(''),

                            nome: Joi.string().uppercase().required(),
                            cpf: Joi.string().required(),
                            rg: Joi.string().required(),
                            telefone: Joi.string().required(),

                            genero: Joi.string().required(),
                            tiposanguineo: Joi.string().allow('', null).default(''),
                            nacionalidade_id: Joi.string().required(),
                            nis: Joi.string().allow('', null).default(''),
                            ctps: Joi.string().allow('', null).default(''),


                            datanascimento: Joi.string().allow('', null).default(''),
                            endereco: Joi.string().allow('', null).default(''),
                            email: Joi.string().allow('', null).default(''),
                            created_at: Joi.string().required(),
                            updated_at: Joi.string().required()

                            },
                            [Segments.PARAMS]:{
                                id: Joi.string().uuid().required(),
                            },
                        }),
                    pacientesController.update
                )

pacientesRouter.delete(
                        '/:id',
                        isAuthenticated,
                        celebrate({
                            [Segments.PARAMS]:{
                                id: Joi.string().uuid().required(),
                            },
                        }),
                        pacientesController.delete
                    )

export default pacientesRouter;
