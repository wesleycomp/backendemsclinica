import { Router } from 'express'
import ConvenioEmpresaController from '../controllers/ConvenioEmpresaController';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '../../../shared/http/middlewares/isAuthenticated';

const convenioempresaRouter = Router();
const convenioempresaController = new ConvenioEmpresaController();

//convenioempresaRouter.get('/',  convenioempresaController.index)

convenioempresaRouter.get(
                    '/:empresa_id',
                   // isAuthenticated,
                    celebrate({
                        [Segments.PARAMS]:{
                            empresa_id: Joi.string().uuid().required(),
                        },
                    }),
                    convenioempresaController.show
                )

convenioempresaRouter.post(
                    '/',
                   // isAuthenticated,
                    celebrate({
                        [Segments.BODY]:{
                            empresa_id: Joi.string().required(),
                            exame_id: Joi.string().required(),
                            valorexame: Joi.number().required(),
                            valormedico: Joi.number().required(),
                            valorems: Joi.number().required(),
                            ativo: Joi.boolean().required(),
                            user_id: Joi.string().required(),
                        },
                    }),
                    convenioempresaController.create
                )

convenioempresaRouter.put(
                    '/:id',
                    //isAuthenticated,
                    celebrate({
                            [Segments.BODY]:{
                                id: Joi.string().required(),
                                empresa_id: Joi.string().required(),
                                exame_id: Joi.string().required(),
                                valorexame: Joi.number().required(),
                                valormedico: Joi.number().required(),
                                valorems: Joi.number().required(),
                                ativo: Joi.boolean().required(),
                                user_id: Joi.string().required(),
                                created_at: Joi.string().required(),
                                updated_at: Joi.string().required(),
                            },
                            [Segments.PARAMS]:{
                                id: Joi.string().uuid().required(),
                            },
                        }),
                    convenioempresaController.update
                )

convenioempresaRouter.delete(
                        '/:id',
                        isAuthenticated,
                        celebrate({
                            [Segments.PARAMS]:{
                                id: Joi.string().uuid().required(),
                            },
                        }),
                        convenioempresaController.delete
                    )

export default convenioempresaRouter;
