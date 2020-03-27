const request = require('supertest');
const connection = require('../../src/database/connection');
const app = require('../../src/app');

describe('ONG', () => {
  beforeEach(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it('should be able to create a new ONG', async () => {
    const response = await request(app)
      .post('/ongs')
      .send({
        name: 'nome ong',
        email: 'ong@onc.com',
        whatsapp: '4700000000',
        city: 'nome city',
        uf: 'SS'
      });

    expect(response.body).toHaveProperty('id');
    expect(response.body.id).toHaveLength(8);
  });

  it('should be able to retrieve all ongs', async () => {
    const data = {
      id: 'ABCDOF12',
      name: 'nome ong',
      email: 'ong@onc.com',
      whatsapp: '4700000000',
      city: 'nome city',
      uf: 'SS'
    };

    await connection('ongs').insert(data);
    const data2 = { ...data };
    data2.id = data.id.replace('A', 'B');
    await connection('ongs').insert(data2);
    const data3 = { ...data };
    data3.id = data.id.replace('C', 'A');
    await connection('ongs').insert(data3);

    const response = await request(app)
      .get('/ongs')
      .send();

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(3);
  });
});
