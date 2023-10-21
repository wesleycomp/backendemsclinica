import { Router } from 'express'
import AsoController from '../controllers/AsosController';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '../../../shared/http/middlewares/isAuthenticated';

const AsoRouter = Router();
const asoController = new AsoController();

AsoRouter.get('/', isAuthenticated, asoController.index)

AsoRouter.get(
                   '/:id',
                    isAuthenticated,
                    celebrate({
                        [Segments.PARAMS]:{
                            id: Joi.string().uuid().required(),
                        },
                    }),
                    asoController.show
                )

 AsoRouter.get(
                    '/asoseditadas',
                    isAuthenticated,
                    asoController.showAsosEditadas
                )

AsoRouter.get(
                    '/fichaexame/:id',
                    isAuthenticated,
                    celebrate({
                        [Segments.PARAMS]:{
                            id: Joi.string().uuid().required(),
                        },
                    }),
                    asoController.showFichaExame
                )

 AsoRouter.get(
                    '/xml/:aso_id',
                    isAuthenticated,
                    celebrate({
                        [Segments.PARAMS]:{
                            aso_id: Joi.string().uuid().required(),
                        },
                    }),
                    asoController.geraXML
                )
AsoRouter.get(
                    '/txt2/:aso_id',
                    isAuthenticated,
                    celebrate({
                        [Segments.PARAMS]:{
                            aso_id: Joi.string().uuid().required(),
                        },
                    }),
                    asoController.geraTXT2TecnoSpeed
                )
AsoRouter.post(
                    '/',
                    isAuthenticated,
                    celebrate({
                        [Segments.BODY]:{
                            dataemissaoaso:Joi.string().required(),
                            paciente_id:Joi.string().required(),
                            user_id:Joi.string().required(),
                            empresa_id: Joi.string().required(),
                            funcao_id: Joi.string().required(),
                            tipoaso_id: Joi.string().required(),
                            medico_id: Joi.string().required(),
                            resultado: Joi.string().allow('', null).default(''),
                            user_edit: Joi.string().allow('', null).default(''),
                            tipopagamento_id: Joi.string().required(),
                            transmissaoesocial: Joi.boolean().allow('', null).default('false'),
                            ativo: Joi.boolean().allow('', null).default(true),
                            exameavulso:Joi.boolean().allow('', null).default('false')
                        },
                    }),
                    asoController.create
                )
AsoRouter.put(
                    '/:id',
                    isAuthenticated,
                    celebrate({
                            [Segments.BODY]:{
                                id: Joi.string().required(),
                                dataemissaoaso:Joi.string().required(),
                                paciente_id:Joi.string().required(),
                                empresa_id:Joi.string().required(),
                                funcao_id: Joi.string().required(),
                                tipoaso_id: Joi.string().required(),
                                user_edit: Joi.string().required(),
                                tipopagamento_id: Joi.string().required(),
                                medico_id: Joi.string().required(),
                                resultado: Joi.string().allow('', null).default(''),
                                transmissaoesocial: Joi.boolean().required(),
                                ativo: Joi.boolean().required(),
                                created_at: Joi.string().required(),
                                updated_at: Joi.string().required(),
                                user_id:Joi.string().required(),
                                exameavulso:Joi.boolean().allow('', null).default('false')
                            },
                            [Segments.PARAMS]:{
                                id: Joi.string().uuid().required(),
                            },
                        }),
                    asoController.update
                )
AsoRouter.delete(
                        '/:id',
                        isAuthenticated,
                        celebrate({
                            [Segments.PARAMS]:{
                                id: Joi.string().uuid().required(),
                            },
                        }),
                        asoController.delete
                    )
export default AsoRouter;
