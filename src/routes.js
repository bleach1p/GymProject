import { Router } from 'express';

import SessionController from './app/controllers/SessionController';

import StudentsController from './app/controllers/StudentsController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.post('/registerStudent', StudentsController.store);

routes.put('/updateStudent', StudentsController.update);

export default routes;
