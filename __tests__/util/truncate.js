import map from 'lodash/map';

import database from '../../src/database';

export default function truncate() {
  return Promise.all(
    map(Object.keys(database.pgConnection.models), key => {
      if (['sequelize', 'Sequelize'].includes(key)) return null;
      return database.pgConnection.models[key].destroy({
        where: {},
        force: true,
      });
    }),
  );
}
