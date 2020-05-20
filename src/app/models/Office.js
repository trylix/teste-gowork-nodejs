import Sequelize, { Model } from 'sequelize';

class Office extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        city: Sequelize.STRING,
        state: Sequelize.STRING,
        image: Sequelize.STRING,
      },
      {
        sequelize,
      },
    );

    return this;
  }

  static async getAll() {
    return this.findAll({
      attributes: ['id', 'name', 'city', 'state', 'image'],
    });
  }

  static async getById(id) {
    return this.findByPk(id, {
      attributes: ['id', 'name', 'city', 'state', 'image'],
    });
  }
}

export default Office;
