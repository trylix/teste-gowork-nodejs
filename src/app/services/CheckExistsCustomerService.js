import DuplicatedItemError from '../exceptions/DuplicatedItemError';
import Customer from '../models/Customer';

class CheckExistsCustomerService {
  async run({ document }) {
    const customer = await Customer.findOne({
      where: { document },
    });

    if (customer) {
      throw new DuplicatedItemError('Customer already exists in database.');
    }

    return customer;
  }
}

export default new CheckExistsCustomerService();
