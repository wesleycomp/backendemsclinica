import { Router } from 'express'
import ExameController from '../controllers/ExameController';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '../../../shared/http/middlewares/isAuthenticated';

const ExameRouter = Router();
const exameController = new ExameController();

ExameRouter.get('/', isAuthenticated, exameController.index)

ExameRouter.get(
                    '/:id',
                    isAuthenticated,
                    celebrate({
                        [Segments.PARAMS]:{
                            id: Joi.string().uuid().required(),
                        },
                    }),
                    exameController.show
                )

ExameRouter.post(
                    '/',
                    isAuthenticated,
                    celebrate({
                        [Segments.BODY]:{
                            name: Joi.string().required(),
                            especialidademedica_id: Joi.string().required(),
                        },
                    }),
                    exameController.create
                )

ExameRouter.put(
                    '/:id',
                    isAuthenticated,
                    celebrate({
                            [Segments.BODY]:{
                                id: Joi.string().required(),
                                name: Joi.string().required(),
                                especialidademedica_id: Joi.string().required(),
                                created_at: Joi.string().required(),
                                updated_at: Joi.string().required(),
                            },
                            [Segments.PARAMS]:{
                                id: Joi.string().uuid().required(),
                            },
                        }),
                    exameController.update
                )

ExameRouter.delete(
                        '/:id',
                        isAuthenticated,
                        celebrate({
                            [Segments.PARAMS]:{
                                id: Joi.string().uuid().required(),
                            },
                        }),
                        exameController.delete
                    )

export default ExameRouter;
