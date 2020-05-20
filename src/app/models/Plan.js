import Sequelize, { Model } from 'sequelize';

class Plan extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        monthly_cost: Sequelize.STRING,
      },
      {
        sequelize,
      },
    );

    return this;
  }

  static async getAll() {
    return this.findAll();
  }

  static async getById(id) {
    return this.findByPk(id, {
      attributes: ['id', 'name', 'monthly_cost'],
    });
  }
}

export default Plan;
