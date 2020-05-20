import Customer from '../../models/Customer';
import CheckExistsCustomerService from '../../services/CheckExistsCustomerService';
import GetOfficeByIdService from '../../services/GetOfficeByIdService';
import GetPlanByIdService from '../../services/GetPlanByIdService';

class CustomerController {
  async index(req, res) {
    const customers = await Customer.getAll();

    return res.status(200).json(customers);
  }

  async store(req, res) {
    const { document, office_id, plan_id } = req.body;

    await CheckExistsCustomerService.run({ document });

    await GetPlanByIdService.run({ id: plan_id });

    await GetOfficeByIdService.run({ id: office_id });

    const { id } = await Customer.create(req.body);

    const customer = await Customer.getById(id);

    return res.status(201).json(customer);
  }
}

export default new CustomerController();
