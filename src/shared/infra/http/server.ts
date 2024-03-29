import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import swaggerUI from 'swagger-ui-express';

import { AppError } from '@shared/errors/AppError';

import 'reflect-metadata';
import { router } from './routes';
import swaggerFile from '../../../swagger.json';

import createConnection from '@shared/infra/typeorm';
import '@shared/container';

createConnection();
const app = express();

app.use(express.json());

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerFile));

app.use(router);

app.use(
    (err: Error, request: Request, response: Response, next: NextFunction) => {
        if (err instanceof AppError) {
            return response
                .status(err.statusCode)
                .json({ message: err.message });
        }

        return response.status(500).json({
            status: 'error',
            message: `Internal Server Error - ${err.message}`,
        });
    }
);

app.listen(3333, () => {
    console.log('Server started on port 3333');
});
