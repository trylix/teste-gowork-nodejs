import bcrypt from 'bcryptjs';
import fs from 'mz/fs';
import request from 'supertest';

import app from '../../src/App';
import factory from '../factories';
import truncate from '../util/truncate';

describe('File', () => {
  const filePath = `${__dirname}/../util/image.jpg`;

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

  it('should be able to upload file', async () => {
    fs.exists(filePath).then(exists => {
      if (!exists) throw new Error('file does not exist');

      return request(app)
        .post('/api/upload')
        .set('Authorization', `Bearer ${token}`)
        .attach('file', filePath)
        .then(response => {
          expect(response.body).toHaveProperty('path');
        })
        .catch(err => console.log(err));
    });
  });
});
