import bcrypt from 'bcryptjs';
import request from 'supertest';

import app from '../../src/App';
import factory from '../factories';
import truncate from '../util/truncate';

describe('Employee', () => {
  let user;
  let token;

  beforeEach(async () => {
    await truncate();

    user = await factory.create('User', {
      password: bcrypt.hashSync('123456', 8),
    });

    const response = await request(app).post('/api/auth').send({
      email: user.email,
      password: '123456',
    });

    const { access_token } = response.body;

    token = access_token;
  });

  it('should be able to register employee', async () => {
    const office = await factory.create('Office');
    const plan = await factory.create('Plan');

    const customer = await factory.create('Customer', {
      name: 'Mari Ana',
      is_company: '0',
      document: '145.678.487-58',
      office_id: office.id,
      plan_id: plan.id,
    });

    const response = await request(app)
      .post('/api/employees')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Jão Grilo',
        customer_id: customer.id,
      });

    expect(response.status).toBe(201);

    expect(response.body).toHaveProperty('id');
  });

  it('should not be able register employee missing field', async () => {
    const response = await request(app)
      .post('/api/employees')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Harry',
      });

    expect(response.status).toBe(401);
  });

  it('should not be able register employee with invalid customer id', async () => {
    const response = await request(app)
      .post('/api/employees')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Harry',
        customer_id: 10,
      });

    expect(response.status).toBe(404);
  });

  it('should be able list all employees by customer id', async () => {
    const office = await factory.create('Office');
    const plan = await factory.create('Plan');

    const customer = await factory.create('Customer', {
      office_id: office.id,
      plan_id: plan.id,
    });

    await factory.create('Employee', {
      customer_id: customer.id,
    });

    const response = await request(app)
      .get(`/api/employees/${customer.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send();

    expect(response.status).toBe(200);

    expect(response.body[0]).toHaveProperty('id');
  });

  it('should not be able create employee missing authorization', async () => {
    const office = await factory.create('Office');
    const plan = await factory.create('Plan');

    const customer = await factory.create('Customer', {
      office_id: office.id,
      plan_id: plan.id,
    });

    const employee = await factory.attrs('Employee', {
      customer_id: customer.id,
    });

    const response = await request(app).post('/api/employees').send(employee);

    expect(response.status).toBe(401);
  });
});
