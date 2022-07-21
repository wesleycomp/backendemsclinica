import { Router } from 'express'
import PacientesController from '../controllers/PacientesController';
import { celebrate, Joi, Segments } from 'celebrate';

const pacientesRouter = Router();
const pacientesController = new PacientesController();

pacientesRouter.get('/', pacientesController.index)

pacientesRouter.get(
                    '/:id',
                    celebrate({
                        [Segments.PARAMS]:{
                            id: Joi.string().uuid().required(),
                        },
                    }),
                    pacientesController.show
                )

pacientesRouter.post(
                    '/',
                    celebrate({
                        [Segments.BODY]:{
                            name: Joi.string().required(),
                            cpf: Joi.string().required(),
                            datanascimento: Joi.string().required(),
                        },
                    }),
                    pacientesController.create
                )

pacientesRouter.put(
                    '/:id',
                    celebrate({
                            [Segments.BODY]:{
                                name: Joi.string().required(),
                                  cpf: Joi.string().required()
                            },
                            [Segments.PARAMS]:{
                                id: Joi.string().uuid().required(),
                            },
                        }),
                    pacientesController.update
                )

pacientesRouter.delete(
                        '/:id',
                        celebrate({
                            [Segments.PARAMS]:{
                                id: Joi.string().uuid().required(),
                            },
                        }),
                        pacientesController.delete
                    )

export default pacientesRouter;
