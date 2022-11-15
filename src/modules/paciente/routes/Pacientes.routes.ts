import { Router } from 'express'
import PacientesController from '../controllers/PacientesController';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '../../../shared/http/middlewares/isAuthenticated';

const pacientesRouter = Router();
const pacientesController = new PacientesController();

pacientesRouter.get('/', isAuthenticated, pacientesController.index)

pacientesRouter.get(
                    '/:id',
                    isAuthenticated,
                    celebrate({
                        [Segments.PARAMS]:{
                            id: Joi.string().uuid().required(),
                        },
                    }),
                    pacientesController.show
                )

pacientesRouter.post(
                    '/',
                    isAuthenticated,
                    celebrate({
                        [Segments.BODY]:{
                            empresa_id: Joi.string().required(),
                            funcao_id: Joi.string().required(),
                            categoriatrabalhador_id: Joi.string().required(),
                            matricula: Joi.string().required(),
                            dataentradaempresa: Joi.string().required(),
                            descricaoatividade: Joi.string().required(),

                            nome: Joi.string().required(),
                            cpf: Joi.string().required(),
                            rg: Joi.string().required(),
                            telefone: Joi.string().required(),

                            genero: Joi.string().required(),
                            tiposanguineo: Joi.string().required(),
                            nacionalidade_id: Joi.string().required(),
                            nis: Joi.string().required(),
                            ctps: Joi.string().required(),


                            datanascimento: Joi.string().required(),
                            endereco: Joi.string().required(),
                            email: Joi.string().required(),
                        },
                    }),
                    pacientesController.create
                )

pacientesRouter.put(
                    '/:id',
                    isAuthenticated,
                    celebrate({
                            [Segments.BODY]:{

                            id: Joi.string().required(),
                            empresa_id: Joi.string().required(),
                            funcao_id: Joi.string().required(),
                            categoriatrabalhador_id: Joi.string().required(),
                            matricula: Joi.string().required(),
                            dataentradaempresa: Joi.string().required(),
                            descricaoatividade: Joi.string().required(),

                            nome: Joi.string().required(),
                            cpf: Joi.string().required(),
                            rg: Joi.string().required(),
                            telefone: Joi.string().required(),

                            genero: Joi.string().required(),
                            tiposanguineo: Joi.string().required(),
                            nacionalidade_id: Joi.string().required(),
                            nis: Joi.string().required(),
                            ctps: Joi.string().required(),


                            datanascimento: Joi.string().required(),
                            endereco: Joi.string().required(),
                            email: Joi.string().required(),
                            created_at: Joi.string().required(),
                            updated_at: Joi.string().required()

                            },
                            [Segments.PARAMS]:{
                                id: Joi.string().uuid().required(),
                            },
                        }),
                    pacientesController.update
                )

pacientesRouter.delete(
                        '/:id',
                        isAuthenticated,
                        celebrate({
                            [Segments.PARAMS]:{
                                id: Joi.string().uuid().required(),
                            },
                        }),
                        pacientesController.delete
                    )

export default pacientesRouter;
