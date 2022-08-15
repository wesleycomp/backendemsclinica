import { Router } from 'express'
import EspecialidadeMedicaController from '../controllers/EspecialidadeMedicaController';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '../../../shared/http/middlewares/isAuthenticated';

const especialidadeMedicaRouter = Router();
const especialidadeMedicaController = new EspecialidadeMedicaController();

especialidadeMedicaRouter.get('/', isAuthenticated, especialidadeMedicaController.index)

especialidadeMedicaRouter.get(
                    '/:id',
                    isAuthenticated,
                    celebrate({
                        [Segments.PARAMS]:{
                            id: Joi.string().uuid().required(),
                        },
                    }),
                    especialidadeMedicaController.show
                )

especialidadeMedicaRouter.post(
                    '/',
                    isAuthenticated,
                    celebrate({
                        [Segments.BODY]:{
                            name: Joi.string().required(),
                        },
                    }),
                    especialidadeMedicaController.create
                )

especialidadeMedicaRouter.put(
                    '/:id',
                    isAuthenticated,
                    celebrate({
                            [Segments.BODY]:{
                                id: Joi.string().required(),
                                name: Joi.string().required(),
                                created_at: Joi.string().required(),
                                updated_at: Joi.string().required(),
                            },
                            [Segments.PARAMS]:{
                                id: Joi.string().uuid().required(),
                            },
                        }),
                    especialidadeMedicaController.update
                )

especialidadeMedicaRouter.delete(
                        '/:id',
                        isAuthenticated,
                        celebrate({
                            [Segments.PARAMS]:{
                                id: Joi.string().uuid().required(),
                            },
                        }),
                        especialidadeMedicaController.delete
                    )

export default especialidadeMedicaRouter;
