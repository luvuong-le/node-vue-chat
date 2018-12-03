const { app } = require('../server');
const { userSeedData } = require('./seed/seedData');
const supertest = require('supertest');

let token;
let request = supertest(app);

beforeAll(async () => {
    const response = await request
        .post('/api/auth/login')
        .send({ email: userSeedData[0].email, password: userSeedData[0].password });

    token = response.body.token;
});

describe('GET /api/room', () => {
    it('should return an array of rooms', async () => {
        const response = await request.get('/api/room').set('Authorization', token);

        expect(response.status).toEqual(200);
        expect(response.body.length).toBeGreaterThan(0);
    });

    it('should get the room by room name', async () => {
        const response = await request
            .get('/api/room/Test%20Room%20%231')
            .set('Authorization', token);

        expect(response.status).toEqual(200);
        expect(response.body).not.toBeNull();
        expect(Object.keys(response.body).length).toBeGreaterThan(0);
    });
});

describe('POST /api/room', () => {
    it('should create a new room', async () => {
        const response = await request
            .post('/api/room')
            .send({
                room_name: 'Jest Test Room',
                password: ''
            })
            .set('Authorization', token);

        expect(response.status).toEqual(200);
        expect(response.body).not.toBeNull();
        expect(Object.keys(response.body).length).toBeGreaterThan(0);
    });
});
