import { Router } from 'express';

import AuthController from '../app/controllers/api/AuthController';
import OfficeController from '../app/controllers/api/OfficeController';
import authMiddleware from '../app/middlewares/auth';
import validateOfficeStore from '../app/validators/OfficeStore';
import validateUserAuth from '../app/validators/UserAuth';

const routes = Router();

routes.post('/api/auth', validateUserAuth, AuthController.store);

routes.use(authMiddleware);

routes.get('/api/offices', OfficeController.index);
routes.post('/api/offices', validateOfficeStore, OfficeController.store);

export default routes;
