import { Router } from 'express'
import ExameAsoController from '../controllers/ExameAsoController';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '../../../shared/http/middlewares/isAuthenticated';

const ExameAsoRouter = Router();
const exameAsoController = new ExameAsoController();


ExameAsoRouter.get(
                    '/historico/exameasoexcluida',
                    isAuthenticated,
                    exameAsoController.showExameAsoExcluidas
                )

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
                    '/listexames/:datainicio/:datafim/:tipopagamento/:usuario/:empresa/:empresafora',
                    isAuthenticated,
                    celebrate({
                        [Segments.PARAMS]:{
                            datainicio: Joi.string().required(),
                            datafim: Joi.string().required(),
                            tipopagamento: Joi.string(),
                            usuario: Joi.string(),
                            empresa: Joi.string(),
                            empresafora: Joi.string(),
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
                            user_id:Joi.string().required()
                        },
                    }),
                    exameAsoController.create
                )
ExameAsoRouter.put(
                    '/desconto/:id',
                    isAuthenticated,
                    celebrate({
                        [Segments.BODY]:{
                            id: Joi.string().required(),
                            desconto: Joi.boolean().required(),
                            valorexamesemdesconto: Joi.number().required(),
                            user_desconto:Joi.string().required(),
                            updated_at: Joi.string().required()
                        },
                    }),
                    exameAsoController.update
                )
ExameAsoRouter.delete(
                        '/:id/:usuario_id',
                        isAuthenticated,
                        celebrate({
                            [Segments.PARAMS]:{
                                id: Joi.string().uuid().required(),
                                usuario_id:Joi.string().uuid().required()
                            },
                        }),
                        exameAsoController.delete
                    )
export default ExameAsoRouter;
