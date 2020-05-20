import Employee from '../../models/Employee';
import GetCustomerByIdService from '../../services/GetCustomerByIdService';

class EmployeeController {
  async index(req, res) {
    const { customer_id } = req.params;

    const employees = await Employee.getAll(customer_id);

    return res.status(200).json(employees);
  }

  async store(req, res) {
    const { customer_id } = req.body;

    await GetCustomerByIdService.run({ id: customer_id });

    const { id } = await Employee.create(req.body);

    const employee = await Employee.getById(id);

    return res.status(201).json(employee);
  }
}

export default new EmployeeController();
