import Office from '../../models/Office';
import CheckExistsOfficeService from '../../services/CheckExistsOfficeService';

class OfficeController {
  async index(req, res) {
    const offices = await Office.getAll();

    return res.status(200).json(offices);
  }

  async store(req, res) {
    const { name } = req.body;

    await CheckExistsOfficeService.run({ name });

    const { id, city, state, image } = await Office.create(req.body);

    return res.status(201).json({ id, name, city, state, image });
  }
}

export default new OfficeController();
