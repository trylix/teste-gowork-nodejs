import bcrypt from 'bcryptjs';
import request from 'supertest';

import app from '../../src/App';
import factory from '../factories';
import truncate from '../util/truncate';

describe('Plan', () => {
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

  it('should be able to register plan', async () => {
    const plan = await factory.attrs('Plan');

    const response = await request(app)
      .post('/api/plans')
      .set('Authorization', `Bearer ${token}`)
      .send(plan);

    expect(response.status).toBe(201);

    expect(response.body).toHaveProperty('id');
  });

  it('should not be able register plan with duplicated info', async () => {
    const plan = await factory.create('Plan');

    const { name } = plan;

    const response = await request(app)
      .post('/api/plans')
      .set('Authorization', `Bearer ${token}`)
      .send({ name, monthly_cost: 'R$ 600,00' });

    expect(response.status).toBe(401);
  });

  it('should not be able register plan missing field', async () => {
    const { name } = await factory.attrs('Plan');

    const response = await request(app)
      .post('/api/plans')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name,
      });

    expect(response.status).toBe(401);
  });

  it('should be able list all plans', async () => {
    factory.createMany('Plan', 10);

    const response = await request(app)
      .get('/api/plans')
      .set('Authorization', `Bearer ${token}`)
      .send();

    expect(response.status).toBe(200);

    expect(response.body[0]).toMatchObject('id');
  });

  it('should not be able create plan missing authorization', async () => {
    const plan = await factory.attrs('Plan');

    const response = await request(app).post('/api/plans').send(plan);

    expect(response.status).toBe(401);
  });

  it('should not be able list plans missing authorization', async () => {
    const response = await request(app).get('/api/plans').send();

    expect(response.status).toBe(401);
  });
});
