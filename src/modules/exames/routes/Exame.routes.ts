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
                            especialidademedica_id: Joi.string().required(),
                            name: Joi.string().required(),
                            valoravista: Joi.number().required(),
                            valormedico: Joi.number().required(),
                            valorems: Joi.number().required(),
                            ativo: Joi.boolean().required()
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
                                especialidademedica_id: Joi.string().required(),
                                name: Joi.string().required(),
                                valoravista: Joi.number().required(),
                                valormedico: Joi.number().required(),
                                valorems: Joi.number().required(),
                                ativo: Joi.boolean().required()

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
