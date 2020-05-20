import Sequelize, { Model } from 'sequelize';

import Customer from './Customer';

class Employee extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
      },
      {
        sequelize,
      },
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Customer, {
      foreignKey: 'customer_id',
      as: 'customer',
    });
  }

  static async getById(id) {
    return this.findByPk(id, {
      attributes: ['id', 'name'],
      include: {
        attributes: ['id', 'name', 'is_company', 'document'],
        include: [
          {
            model: Office,
            as: 'office',
            attributes: ['id', 'name', 'city', 'state', 'image'],
          },
          {
            model: Plan,
            as: 'plan',
            attributes: ['id', 'name', 'monthly_cost'],
          },
        ],
      },
    });
  }

  static async getAll(id) {
    return this.findAll({
      where: { customer_id: id },
      attributes: ['id', 'name'],
      include: {
        model: Customer,
        as: 'customer',
        attributes: ['id', 'name', 'email'],
      },
    });
  }
}

export default Employee;
