import { Router } from 'express'
import FuncoesController from '../controllers/FuncoesController';
import { celebrate, Joi, Segments } from 'celebrate';

const funcoesRouter = Router();
const funcoesController = new FuncoesController();

funcoesRouter.get('/', funcoesController.index)

funcoesRouter.get(
                    '/:id',
                    celebrate({
                        [Segments.PARAMS]:{
                            id: Joi.string().uuid().required(),
                        },
                    }),
                    funcoesController.show
                )

funcoesRouter.post(
                    '/',
                    celebrate({
                        [Segments.BODY]:{
                            name: Joi.string().required()
                        },
                    }),
                    funcoesController.create
                )

funcoesRouter.put(
                    '/:id',
                    celebrate({
                            [Segments.BODY]:{
                                name: Joi.string().required()
                            },
                            [Segments.PARAMS]:{
                                id: Joi.string().uuid().required(),
                            },
                        }),
                    funcoesController.update
                )

funcoesRouter.delete(
                        '/:id',
                        celebrate({
                            [Segments.PARAMS]:{
                                id: Joi.string().uuid().required(),
                            },
                        }),
                        funcoesController.delete
                    )

export default funcoesRouter;
