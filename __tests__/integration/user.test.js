import bcrypt from 'bcryptjs';
import faker from 'faker';
import request from 'supertest';

import app from '../../src/App';
import factory from '../factories';
import truncate from '../util/truncate';

describe('integration test from /auth endpoint', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should be able to login', async () => {
    const user = await factory.create('User', {
      password: bcrypt.hashSync('123456', 8),
    });

    const response = await request(app).post('/api/auth').send({
      email: user.email,
      password: '123456',
    });

    expect(response.body).toHaveProperty('access_token');
  });

  it('should not be able to login', async () => {
    const user = await factory.create('User');

    const otherUser = await factory.attrs('User', {
      password: bcrypt.hashSync(faker.internet.password(), 8),
    });

    const response = await request(app).post('/api/auth').send({
      email: user.email,
      password: otherUser.password,
    });

    expect(response.status).toBe(401);
  });

  it('should be able to register user', async () => {
    const newUser = await factory.attrs('User');

    const response = await request(app).post('/api/user').send({
      name: newUser.name,
      email: newUser.email,
      password: newUser.password,
    });

    expect(response.status).toBe(201);
  });

  it('should not be able to register user duplicated email', async () => {
    const newUser = await factory.create('User');

    const response = await request(app).post('/api/user').send({
      name: newUser.name,
      email: newUser.email,
      password: newUser.password,
    });

    expect(response.status).toBe(401);
  });

  it('should not be able to register user missing fields', async () => {
    const newUser = await factory.attrs('User');

    const response = await request(app).post('/api/user').send({
      email: newUser.email,
    });

    expect(response.status).toBe(401);
  });
});
