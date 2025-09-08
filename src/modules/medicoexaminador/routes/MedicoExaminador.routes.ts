import { Router } from 'express'
import MedicoExaminadorController from '../controllers/MedicoExaminadorController';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '../../../shared/http/middlewares/isAuthenticated';

const MedicoExaminadorRouter = Router();

const medicoExaminadorController = new MedicoExaminadorController();

MedicoExaminadorRouter.get('/', isAuthenticated, medicoExaminadorController.index)

MedicoExaminadorRouter.get(
                    '/:id',
                    isAuthenticated,
                    celebrate({
                        [Segments.PARAMS]:{
                            id: Joi.string().uuid().required(),
                        },
                    }),
                    medicoExaminadorController.show
                )

MedicoExaminadorRouter.get(
                    '/:id',
                    isAuthenticated,
                    celebrate({
                        [Segments.PARAMS]:{
                            id: Joi.string().uuid().required(),
                        },
                    }),
                    medicoExaminadorController.show
                )

MedicoExaminadorRouter.post(
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
                    medicoExaminadorController.create
                )

MedicoExaminadorRouter.put(
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
                                endereco: Joi.string(),
                                email: Joi.string(),
                                created_at: Joi.string().required(),
                                updated_at: Joi.string().required()
                            },
                            [Segments.PARAMS]:{
                                id: Joi.string().uuid().required(),
                            },
                        }),
                    medicoExaminadorController.update
                )

MedicoExaminadorRouter.delete(
                        '/:id',
                        isAuthenticated,
                        celebrate({
                            [Segments.PARAMS]:{
                                id: Joi.string().uuid().required(),
                            },
                        }),
                        medicoExaminadorController.delete
                    )

export default MedicoExaminadorRouter;
