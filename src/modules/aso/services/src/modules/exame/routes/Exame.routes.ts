import { Router } from 'express'
import ExameController from '../controllers/ExameController';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '../../../shared/http/middlewares/isAuthenticated';

const exameRouter = Router();
const exameController = new ExameController();

exameRouter.get('/', isAuthenticated, exameController.index)

exameRouter.get(
                    '/:id',
                    isAuthenticated,
                    celebrate({
                        [Segments.PARAMS]:{
                            id: Joi.string().uuid().required(),
                        },
                    }),
                    exameController.show
                )
exameRouter.post(
                    '/',
                    isAuthenticated,
                    celebrate({
                        [Segments.BODY]:{
                            procedimento_id: Joi.string().required(),
                            name: Joi.string().required(),
                            valoravista: Joi.number().required(),
                            valormedico: Joi.number().required(),
                            valorems: Joi.number().required(),
                            ativo: Joi.boolean().required()
                        },
                    }),
                    exameController.create
                )
exameRouter.put(
                    '/:id',
                    isAuthenticated,
                    celebrate({
                            [Segments.BODY]:{
                                id: Joi.string().required(),
                                procedimento_id: Joi.string().required(),
                                name: Joi.string().required(),
                                valoravista: Joi.number().required(),
                                valormedico: Joi.number().required(),
                                valorems: Joi.number().required(),
                                ativo: Joi.boolean().required(),
                                created_at: Joi.string().required(),
                                updated_at: Joi.string().required()

                            },
                            [Segments.PARAMS]:{
                                id: Joi.string().uuid().required(),
                            },
                        }),
                    exameController.update
                )
exameRouter.delete(
                        '/:id',
                        isAuthenticated,
                        celebrate({
                            [Segments.PARAMS]:{
                                id: Joi.string().uuid().required(),
                            },
                        }),
                        exameController.delete
                    )
export default exameRouter;
