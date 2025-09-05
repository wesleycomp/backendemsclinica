import { Router } from 'express'
import MedicosController from '../controllers/MedicosController';
import MedicoFechamentoController from '../controllers/MedicoFechamentoController';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '../../../shared/http/middlewares/isAuthenticated';

const MedicosRouter = Router();
const medicosController = new MedicosController();
const FechamentoMedicoController = new MedicoFechamentoController();

MedicosRouter.get('/', isAuthenticated, medicosController.index)

MedicosRouter.get(
                    '/:id',
                    isAuthenticated,
                    celebrate({
                        [Segments.PARAMS]:{
                            id: Joi.string().uuid().required(),
                        },
                    }),
                    medicosController.show
                )

  MedicosRouter.get(
                    '/medicoativo/list',
                    isAuthenticated,
                    medicosController.getMedicoAtivoAll
                )

MedicosRouter.post(
                    '/',
                    isAuthenticated,
                    celebrate({
                        [Segments.BODY]:{
                            nome: Joi.string().uppercase().required(),
                            cpf: Joi.string().required(),
                            rg: Joi.string(),
                            crm: Joi.string().required(),
                            ufcrm: Joi.string().required(),
                            telefone: Joi.string().required(),
                            datanascimento: Joi.string().required(),
                            endereco: Joi.string(),
                            email: Joi.string()
                        },
                    }),
                    medicosController.create
                )

MedicosRouter.put(
                    '/:id',
                    isAuthenticated,
                    celebrate({
                            [Segments.BODY]:{
                                id: Joi.string().required(),
                                nome: Joi.string().uppercase().required(),
                                cpf: Joi.string().required(),
                                rg: Joi.string(),
                                crm: Joi.string().required(),
                                ufcrm: Joi.string().required(),
                                telefone: Joi.string().required(),
                                datanascimento: Joi.string().required(),
                                endereco: Joi.string().required(),
                                email: Joi.string(),
                                ativo: Joi.boolean(),
                                created_at: Joi.string().required(),
                                updated_at: Joi.string().required()
                            },
                            [Segments.PARAMS]:{
                                id: Joi.string().uuid().required(),
                            },
                        }),
                    medicosController.update
                )

MedicosRouter.delete(
                        '/:id',
                        isAuthenticated,
                        celebrate({
                            [Segments.PARAMS]:{
                                id: Joi.string().uuid().required(),
                            },
                        }),
                        medicosController.delete
                    )



MedicosRouter.get(
                    '/fechamentomedico/:medico_id',
                    isAuthenticated,
                    celebrate({
                        [Segments.PARAMS]:{
                            medico_id: Joi.string().uuid().required(),
                        },
                    }),
                    FechamentoMedicoController.show
                )





MedicosRouter.post(
                    '/fechamentomedico',
                    isAuthenticated,
                    celebrate({
                        [Segments.BODY]:{
                            medico_id: Joi.string().required(),
                            exame_id: Joi.string().required(),
                            valor: Joi.number().required()
                        },
                    }),
                    FechamentoMedicoController.create
                )

MedicosRouter.put(
                    '/fechamentomedico/:id',
                    isAuthenticated,
                    celebrate({
                            [Segments.BODY]:{
                                id: Joi.string().required(),
                                medico_id: Joi.string().required(),
                                exame_id: Joi.string().required(),
                                valor: Joi.number().required(),
                                created_at: Joi.string().required(),
                                updated_at: Joi.string().required()
                            },
                            [Segments.PARAMS]:{
                                id: Joi.string().uuid().required(),
                            },
                        }),
                    FechamentoMedicoController.update
                )

MedicosRouter.delete(
                        '/fechamentomedico/:id',
                        isAuthenticated,
                        celebrate({
                            [Segments.PARAMS]:{
                                id: Joi.string().uuid().required(),
                            },
                        }),
                        FechamentoMedicoController.delete
                    )

export default MedicosRouter;
