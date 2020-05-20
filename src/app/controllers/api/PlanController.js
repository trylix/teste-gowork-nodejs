import Plan from '../../models/Plan';
import CheckExistsPlanService from '../../services/CheckExistsPlanService';

class PlanController {
  async index(req, res) {
    const plans = await Plan.getAll();

    return res.status(200).json(plans);
  }

  async store(req, res) {
    const { name } = req.body;

    await CheckExistsPlanService.run({ name });

    const { id, monthly_cost } = await Plan.create(req.body);

    return res.status(201).json({ id, name, monthly_cost });
  }
}

export default new PlanController();
