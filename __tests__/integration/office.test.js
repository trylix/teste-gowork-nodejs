import bcrypt from 'bcryptjs';
import request from 'supertest';

import app from '../../src/App';
import factory from '../factories';
import truncate from '../util/truncate';

describe('Office', () => {
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

  it('should be able to register office', async () => {
    const office = await factory.attrs('Office');

    const response = await request(app)
      .post('/api/offices')
      .set('Authorization', `Bearer ${token}`)
      .send(office);

    expect(response.status).toBe(201);

    expect(response.body).toHaveProperty('id');
  });

  it('should not be able register office with duplicated info', async () => {
    const office = await factory.create('Office');

    const { name, city, state, image } = office;

    const response = await request(app)
      .post('/api/offices')
      .set('Authorization', `Bearer ${token}`)
      .send({ name, city, state, image });

    expect(response.status).toBe(401);
  });

  it('should not be able register office missing field', async () => {
    const { name, city, state } = await factory.attrs('Office');

    const response = await request(app)
      .post('/api/offices')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name,
        city,
        state,
      });

    expect(response.status).toBe(401);
  });

  it('should be able list all offices', async () => {
    factory.createMany('Office', 10);

    const response = await request(app)
      .get('/api/offices')
      .set('Authorization', `Bearer ${token}`)
      .send();

    expect(response.status).toBe(200);

    expect(response.body[0]).toHaveProperty('id');
  });

  it('should not be able create office missing authorization', async () => {
    const office = await factory.attrs('Office');

    const response = await request(app).post('/api/offices').send(office);

    expect(response.status).toBe(401);
  });

  it('should not be able list offices missing authorization', async () => {
    const response = await request(app).get('/api/offices').send();

    expect(response.status).toBe(401);
  });
});
