import 'reflect-metadata';
import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import  'express-async-errors';
import cors from 'cors';

import { errors } from 'celebrate';
import { pagination } from 'typeorm-pagination'
import routes from './routes';
import AppError from '@shared/errors/AppError';
import '@shared/typeorm';
import uploadConfig from '@config/upload'

const port = process.env.APP_API_PORT || 3333;
const app = express();

app.use(pagination)
app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.directory))
app.use(routes);
app.use(errors());

app.use(
    (error: Error, request: Request, response: Response, next: NextFunction) => {//middleware trata as requisicoes em todas as API'S - sem precisar usar try cath no sistema

       if(error instanceof AppError){ // entra caso seja erro de requisicao for uma instancia da classe da API
            return response.status(error.statusCode).json({
                status: 'error',
                message: error.message,
            });
       }

        return response.status(500).json({// entra caso seja erro do servidor
            status: 'error',
            message: 'Internal server error'
        })

});

const server =  app.listen(port, () => {
  console.log('Servidor esta startado na port 3333');
});




