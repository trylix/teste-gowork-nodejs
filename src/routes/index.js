import { Router } from 'express';

import AuthController from '../app/controllers/api/AuthController';
import authMiddleware from '../app/middlewares/auth';
import validateUserAuth from '../app/validators/UserAuth';

const routes = Router();

routes.post('/api/auth', validateUserAuth, AuthController.store);

routes.use(authMiddleware);

export default routes;
