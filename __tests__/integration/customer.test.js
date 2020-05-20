import bcrypt from 'bcryptjs';
import request from 'supertest';

import app from '../../src/App';
import factory from '../factories';
import truncate from '../util/truncate';

describe('Customer', () => {
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

  it('should be able to register customer with cpf', async () => {
    const office = await factory.create('Office');
    const plan = await factory.create('Plan');

    const response = await request(app)
      .post('/api/customers')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Jão Grilo',
        is_company: '0',
        document: '123.456.778-56',
        office_id: office.id,
        plan_id: plan.id,
      });

    expect(response.status).toBe(201);

    expect(response.body).toHaveProperty('id');
  });

  it('should be able to register customer with cnpj', async () => {
    const office = await factory.create('Office');
    const plan = await factory.create('Plan');

    const response = await request(app)
      .post('/api/customers')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Jão Grilo 2',
        is_company: '1',
        document: '23.456.778/4566-56',
        office_id: office.id,
        plan_id: plan.id,
      });

    expect(response.status).toBe(201);

    expect(response.body).toHaveProperty('id');
  });

  it('should not be able register customer with duplicated cpf', async () => {
    const office = await factory.create('Office');
    const plan = await factory.create('Plan');

    const { document } = await factory.create('Customer', {
      office_id: office.id,
      plan_id: plan.id,
    });

    const response = await request(app)
      .post('/api/customers')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Grilo',
        is_company: '0',
        document,
        office_id: office.id,
        plan_id: plan.id,
      });

    expect(response.status).toBe(401);
  });

  it('should not be able register customer with duplicated cnpj', async () => {
    const office = await factory.create('Office');
    const plan = await factory.create('Plan');

    const { document } = await factory.create('Customer', {
      document: '12.434.567/2344-5',
      office_id: office.id,
      plan_id: plan.id,
    });

    const response = await request(app)
      .post('/api/customers')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Grilo',
        is_company: '0',
        document,
        office_id: office.id,
        plan_id: plan.id,
      });

    expect(response.status).toBe(401);
  });

  it('should not be able register customer missing field', async () => {
    const response = await request(app)
      .post('/api/customers')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Harry',
        is_company: '0',
        document: '223.456.432-21',
      });

    expect(response.status).toBe(401);
  });

  it('should be able list all customers', async () => {
    const office = await factory.create('Office');
    const plan = await factory.create('Plan');

    await factory.create('Customer', {
      office_id: office.id,
      plan_id: plan.id,
    });

    const response = await request(app)
      .get('/api/customers')
      .set('Authorization', `Bearer ${token}`)
      .send();

    expect(response.status).toBe(200);

    expect(response.body[0]).toHaveProperty('id');
  });

  it('should not be able create office missing authorization', async () => {
    const office = await factory.create('Office');
    const plan = await factory.create('Plan');

    const customer = await factory.attrs('Customer', {
      office_id: office.id,
      plan_id: plan.id,
    });

    const response = await request(app).post('/api/customers').send(customer);

    expect(response.status).toBe(401);
  });

  it('should not be able list customers missing authorization', async () => {
    const response = await request(app).get('/api/customers').send();

    expect(response.status).toBe(401);
  });
});
