import DuplicatedItemError from '../exceptions/DuplicatedItemError';
import Plan from '../models/Plan';

class CheckExistsPlanService {
  async run({ name }) {
    const plan = await Plan.findOne({
      where: { name },
    });

    if (plan) {
      throw new DuplicatedItemError('Plan already exists in database.');
    }

    return plan;
  }
}

export default new CheckExistsPlanService();
