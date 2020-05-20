import { Router } from 'express';

import AuthController from '../app/controllers/api/AuthController';
import CustomerController from '../app/controllers/api/CustomerController';
import EmployeeController from '../app/controllers/api/EmployeeController';
import OfficeController from '../app/controllers/api/OfficeController';
import PlanController from '../app/controllers/api/PlanController';
import authMiddleware from '../app/middlewares/auth';
import validateCustomerStore from '../app/validators/CustomerStore';
import validateEmployeeStore from '../app/validators/EmployeeStore';
import validateOfficeStore from '../app/validators/OfficeStore';
import validatePlanStore from '../app/validators/PlanStore';
import validateUserAuth from '../app/validators/UserAuth';

const routes = Router();

routes.post('/api/auth', validateUserAuth, AuthController.store);

routes.use(authMiddleware);

routes.get('/api/offices', OfficeController.index);
routes.post('/api/offices', validateOfficeStore, OfficeController.store);

routes.get('/api/plans', PlanController.index);
routes.post('/api/plans', validatePlanStore, PlanController.store);

routes.get('/api/customers', CustomerController.index);
routes.post('/api/customers', validateCustomerStore, CustomerController.store);

routes.get('/api/employees/:customer_id', EmployeeController.index);
routes.post('/api/employees', validateEmployeeStore, EmployeeController.store);

export default routes;
