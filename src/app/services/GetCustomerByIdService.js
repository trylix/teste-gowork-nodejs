import NulledItemError from '../exceptions/NulledItemError';
import Customer from '../models/Customer';

class GetCustomerByIdService {
  async run({ id }) {
    const data = await Customer.getById(id);

    if (!data) {
      throw new NulledItemError('Customer not found.');
    }

    return data;
  }
}

export default new GetCustomerByIdService();
