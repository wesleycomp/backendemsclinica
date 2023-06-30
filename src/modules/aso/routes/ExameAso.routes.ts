import { Router } from 'express'
import ExameAsoController from '../controllers/ExameAsoController';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '../../../shared/http/middlewares/isAuthenticated';

const ExameAsoRouter = Router();
const exameAsoController = new ExameAsoController();

ExameAsoRouter.get(
                    '/:aso_id',
                    isAuthenticated,
                    celebrate({
                        [Segments.PARAMS]:{
                            aso_id: Joi.string().uuid().required(),
                        },
                    }),
                    exameAsoController.show
                )

ExameAsoRouter.get(
                    '/listexames/:datainicio/:datafim',
                    isAuthenticated,
                    celebrate({
                        [Segments.PARAMS]:{
                            datainicio: Joi.string().required(),
                            datafim: Joi.string().required(),
                        },
                    }),
                    exameAsoController.showExamesPeriodo
                )

 ExameAsoRouter.get(
                    '/valores/:aso_id',
                    isAuthenticated,
                    celebrate({
                        [Segments.PARAMS]:{
                            aso_id: Joi.string().uuid().required(),
                        },
                    }),
                    exameAsoController.showAsoValores
                )
ExameAsoRouter.post(
                    '/',
                    isAuthenticated,
                    celebrate({
                        [Segments.BODY]:{
                            aso_id:Joi.string().required(),
                            exame_id:Joi.string().required(),
                            valorexame: Joi.number().required(),
                            valormedico: Joi.number().required(),
                            valorems: Joi.number().required(),
                            ativo: Joi.boolean().allow('', null).default('true'),
                            tipopagamento_id: Joi.string().required(),
                        },
                    }),
                    exameAsoController.create
                )
ExameAsoRouter.delete(
                        '/:id',
                        isAuthenticated,
                        celebrate({
                            [Segments.PARAMS]:{
                                id: Joi.string().uuid().required(),
                            },
                        }),
                        exameAsoController.delete
                    )
export default ExameAsoRouter;
