import NulledItemError from '../exceptions/NulledItemError';
import Office from '../models/Office';

class GetOfficeByIdService {
  async run({ id }) {
    const data = await Office.getById(id);

    if (!data) {
      throw new NulledItemError('Office not found.');
    }

    return data;
  }
}

export default new GetOfficeByIdService();
