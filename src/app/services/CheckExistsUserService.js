import DuplicatedItemError from '../exceptions/DuplicatedItemError';
import User from '../models/User';

class CheckExistsUserService {
  async run({ email }) {
    const data = await User.getByEmail(email);

    if (data) {
      throw new DuplicatedItemError('Email already exists in database.');
    }

    return data;
  }
}

export default new CheckExistsUserService();
