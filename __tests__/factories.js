import { factory } from 'factory-girl';
import faker from 'faker';

import Office from '../src/app/models/Office';
import Plan from '../src/app/models/Plan';
import User from '../src/app/models/User';

factory.define('User', User, {
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
});

factory.define('Office', Office, {
  name: `Escritório ${faker.commerce.productName()}`,
  city: faker.address.city(),
  state: faker.address.state(),
  image: 'images/noimage.png',
});

factory.define('Plan', Plan, {
  name: `Plano ${faker.commerce.department()}`,
  monthly_cost: faker.commerce.price(),
});

export default factory;
