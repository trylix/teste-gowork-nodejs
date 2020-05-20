import Sequelize, { Model } from 'sequelize';

import Office from './Office';
import Plan from './Plan';

class Customer extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        is_company: {
          type: Sequelize.ENUM,
          values: ['0', '1'],
        },
        document: Sequelize.STRING,
      },
      {
        sequelize,
      },
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Office, { foreignKey: 'office_id', as: 'office' });
    this.belongsTo(models.Plan, { foreignKey: 'plan_id', as: 'plan' });
  }

  static async getAll() {
    return this.findAll({
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
    });
  }

  static async getByDocument(document) {
    return this.findOne({
      where: { document },
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
    });
  }

  static async getById(id) {
    return this.findByPk(id, {
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
    });
  }
}

export default Customer;
