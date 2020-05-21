import bcrypt from 'bcryptjs';

import User from '../../models/User';
import CheckExistsUserService from '../../services/CheckExistsUserService';

class UserController {
  async store(req, res) {
    const { name, email, password } = req.body;

    await CheckExistsUserService.run({ email });

    const { id } = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, 8),
    });

    return res.status(201).json({ id });
  }
}

export default new UserController();
