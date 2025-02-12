import jwt from 'jsonwebtoken';

import authConfig from '../../../config/auth';
import User from '../../models/User';

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: 'User not found.' });
    }

    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: "Password doesn't match." });
    }

    const { id } = user;

    return res.json({
      access_token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();
