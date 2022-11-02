import { Router } from 'express'
import MedicosController from '../controllers/MedicosController';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '../../../shared/http/middlewares/isAuthenticated';

const MedicosRouter = Router();
const medicosController = new MedicosController();

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

MedicosRouter.post(
                    '/',
                    isAuthenticated,
                    celebrate({
                        [Segments.BODY]:{
                            nome: Joi.string().required(),
                            cpf: Joi.string().required(),
                            rg: Joi.string().required(),
                            telefone: Joi.string().required(),
                            datanascimento: Joi.string().required(),
                            endereco: Joi.string().required(),
                            email: Joi.string().required(),
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
                                nome: Joi.string().required(),
                                cpf: Joi.string().required(),
                                rg: Joi.string().required(),
                                telefone: Joi.string().required(),
                                datanascimento: Joi.string().required(),
                                endereco: Joi.string().required(),
                                email: Joi.string().required(),
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

export default MedicosRouter;
