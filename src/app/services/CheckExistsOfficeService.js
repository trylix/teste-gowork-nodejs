import DuplicatedItemError from '../exceptions/DuplicatedItemError';
import Office from '../models/Office';

class CheckExistsOfficeService {
  async run({ name }) {
    const office = await Office.findOne({
      where: { name },
    });

    if (office) {
      throw new DuplicatedItemError('Office already exists in database.');
    }

    return office;
  }
}

export default new CheckExistsOfficeService();
