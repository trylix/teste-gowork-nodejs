import bcrypt from 'bcryptjs';
import Sequelize, { Model } from 'sequelize';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.STRING,
      },
      {
        sequelize,
      },
    );

    return this;
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password);
  }

  static async getByEmail(email) {
    return this.findOne({
      where: { email },
    });
  }
}

export default User;
