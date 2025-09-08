import { Router } from 'express'
import FuncoesController from '../controllers/FuncoesController';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '../../../shared/http/middlewares/isAuthenticated';

const funcoesRouter = Router();
const funcoesController = new FuncoesController();

funcoesRouter.get('/', isAuthenticated, funcoesController.index)

funcoesRouter.get(
                    '/:id',
                    isAuthenticated,
                    celebrate({
                        [Segments.PARAMS]:{
                            id: Joi.string().uuid().required(),
                        },
                    }),
                    funcoesController.show
                )

funcoesRouter.post(
                    '/',
                    isAuthenticated,
                    celebrate({
                        [Segments.BODY]:{
                            name: Joi.string().required(),
                            cbo: Joi.string().required(),
                        },
                    }),
                    funcoesController.create
                )

funcoesRouter.put(
                    '/:id',
                    isAuthenticated,
                    celebrate({
                            [Segments.BODY]:{
                                id: Joi.string().required(),
                                name: Joi.string().required(),
                                cbo: Joi.string().required(),
                                created_at: Joi.string().required(),
                                updated_at: Joi.string().required(),
                            },
                            [Segments.PARAMS]:{
                                id: Joi.string().uuid().required(),
                            },
                        }),
                    funcoesController.update
                )

funcoesRouter.delete(
                        '/:id',
                        isAuthenticated,
                        celebrate({
                            [Segments.PARAMS]:{
                                id: Joi.string().uuid().required(),
                            },
                        }),
                        funcoesController.delete
                    )

export default funcoesRouter;
