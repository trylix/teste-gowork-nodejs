import { factory } from 'factory-girl';
import faker from 'faker';

import Customer from '../src/app/models/Customer';
import Employee from '../src/app/models/Employee';
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

factory.define('Customer', Customer, {
  name: faker.name.findName(),
  is_company: '0',
  document: '124.567.756-58',
  office_id: 1,
  plan_id: 1,
});

factory.define('Employee', Employee, {
  name: faker.name.findName(),
  customer_id: 1,
});

export default factory;
