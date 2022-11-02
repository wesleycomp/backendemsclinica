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
AsoRouter.post(
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
                    asoController.create
                )
AsoRouter.put(
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
                                ativo: Joi.boolean().required(),
                                created_at: Joi.string().required(),
                                updated_at: Joi.string().required()
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
