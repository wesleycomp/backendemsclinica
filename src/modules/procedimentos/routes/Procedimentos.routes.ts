import { Router } from 'express'
import ProcedimentosController from '../controllers/ProcedimentosController';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '../../../shared/http/middlewares/isAuthenticated';

const procedimentosRouter = Router();
const procedimentosController = new ProcedimentosController();

procedimentosRouter.get('/', isAuthenticated, procedimentosController.index)

procedimentosRouter.get(
                    '/:id',
                    isAuthenticated,
                    celebrate({
                        [Segments.PARAMS]:{
                            id: Joi.string().uuid().required(),
                        },
                    }),
                    procedimentosController.show
                )

procedimentosRouter.post(
                    '/',
                    isAuthenticated,
                    celebrate({
                        [Segments.BODY]:{
                            name: Joi.string().uppercase().required(),
                        },
                    }),
                    procedimentosController.create
                )

procedimentosRouter.put(
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
                    procedimentosController.update
                )

procedimentosRouter.delete(
                        '/:id',
                        isAuthenticated,
                        celebrate({
                            [Segments.PARAMS]:{
                                id: Joi.string().uuid().required(),
                            },
                        }),
                        procedimentosController.delete
                    )

export default procedimentosRouter;
