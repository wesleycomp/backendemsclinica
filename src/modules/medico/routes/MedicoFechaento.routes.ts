import { Router } from 'express'
import MedicoFechamentoController from '../controllers/MedicoFechamentoController';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '../../../shared/http/middlewares/isAuthenticated';

const MedicosRouter = Router();
const FechamentoMedicoController = new MedicoFechamentoController();

// MedicosRouter.get('/', isAuthenticated, medicosController.index)

MedicosRouter.get(
                    '/:id',
                    isAuthenticated,
                    celebrate({
                        [Segments.PARAMS]:{
                            id: Joi.string().uuid().required(),
                        },
                    }),
                    FechamentoMedicoController.show
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
                    FechamentoMedicoController.create
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
                        '/:id',
                        isAuthenticated,
                        celebrate({
                            [Segments.PARAMS]:{
                                id: Joi.string().uuid().required(),
                            },
                        }),
                        FechamentoMedicoController.delete
                    )

export default MedicosRouter;
