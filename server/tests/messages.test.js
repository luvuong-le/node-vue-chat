const { app } = require('../server');
const { userSeedData, messageSeedData } = require('./seed/seedData');

const supertest = require('supertest');

let token;
let request = supertest(app);

beforeAll(async () => {
    jest.setTimeout(30000);
    const response = await request
        .post('/api/auth/login')
        .send({ email: userSeedData[0].email, password: userSeedData[0].password });

    token = response.body.token;
});

describe('GET /api/messages', () => {
    it('should return an array of messages for a room', async () => {
        let response = await request.get('/api/room').set('Authorization', token);

        let room_id = response.body[response.body.length - 1]._id;

        response = await request.get(`/api/messages/${room_id}`).set('Authorization', token);

        expect(response.status).toEqual(200);
        expect(response.body[0].content).toEqual('Test Message 11');
        expect(response.body[0].room).toEqual(room_id);
        expect(response.body.length).toBeGreaterThan(0);
    });
});
