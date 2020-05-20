import NulledItemError from '../exceptions/NulledItemError';
import Plan from '../models/Plan';

class GetPlanByIdService {
  async run({ id }) {
    const data = await Plan.getById(id);

    if (!data) {
      throw new NulledItemError('Plan not found.');
    }

    return data;
  }
}

export default new GetPlanByIdService();
