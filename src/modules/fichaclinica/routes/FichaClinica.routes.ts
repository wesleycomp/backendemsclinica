import { Router } from 'express'
import FichaClinicaController from '../controllers/FichaClinicaController';
import PerguntaFichaClinicaController from '../controllers/PerguntaFichaClinicaController';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '../../../shared/http/middlewares/isAuthenticated';

const fichaClinicasRouter = Router();
const fichaClinicaController = new FichaClinicaController();

const perguntaFichaClinicaController = new PerguntaFichaClinicaController();

fichaClinicasRouter.get('/', isAuthenticated, fichaClinicaController.index)

fichaClinicasRouter.get(
                    '/perguntas/',
                     isAuthenticated,
                    perguntaFichaClinicaController.index
                )
fichaClinicasRouter.get(
                    '/:aso_id',
                    isAuthenticated,
                    celebrate({
                        [Segments.PARAMS]:{
                            aso_id: Joi.string().uuid().required(),
                        },
                    }),
                   fichaClinicaController.show
                )
fichaClinicasRouter.post(
                    '/',
                    isAuthenticated,
                    celebrate({
                        [Segments.BODY]:{
                                aso_id: Joi.string().required(),
                                pergunta: Joi.string().required(),
                                resposta:  Joi.string().allow('', null).default(''),
                                observacao: Joi.string().allow('', null).default('')
                         },
                    }),
                    fichaClinicaController.create
                )
fichaClinicasRouter.put(
                    '/resposta/:id',
                    celebrate({
                            [Segments.BODY]:{
                                resposta:  Joi.string().allow('', null).default(''),
                            },
                            [Segments.PARAMS]:{
                                id: Joi.string().uuid().required(),
                            },
                        }),
                    fichaClinicaController.updateResposta
                )
fichaClinicasRouter.put(
                    '/observacao/:id',
                    isAuthenticated,
                    celebrate({
                            [Segments.BODY]:{
                                observacao: Joi.string().allow('', null).default('')
                            },
                            [Segments.PARAMS]:{
                                id: Joi.string().uuid().required(),
                            },
                        }),
                    fichaClinicaController.updateObservacao
                )
fichaClinicasRouter.delete(
                        '/:id',
                        isAuthenticated,
                        celebrate({
                            [Segments.PARAMS]:{
                                id: Joi.string().uuid().required(),
                            },
                        }),
                        fichaClinicaController.delete
                    )
export default fichaClinicasRouter;
