import Sequelize from 'sequelize';

import Customer from '../app/models/Customer';
import Employee from '../app/models/Employee';
import File from '../app/models/File';
import Office from '../app/models/Office';
import Plan from '../app/models/Plan';
import User from '../app/models/User';
import databaseConfig from '../config/database';

const models = [Customer, Employee, File, Office, Plan, User];

class Database {
  constructor() {
    this.postgres();
  }

  postgres() {
    this.pgConnection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.pgConnection))
      .map(
        model => model.associate && model.associate(this.pgConnection.models),
      );
  }
}

export default new Database();
