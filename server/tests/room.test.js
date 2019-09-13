const { app } = require('../server');
const { userSeedData } = require('./seed/seedData');

const supertest = require('supertest');

let token;
let request = supertest(app);
let roomId;

beforeAll(async () => {
    jest.setTimeout(30000);
    const response = await request
        .post('/api/auth/login')
        .send({ email: userSeedData[0].email, password: userSeedData[0].password });

    token = response.body.token;
});

describe('POST /api/room', () => {
    it('should create a new room', async () => {
        const response = await request
            .post('/api/room')
            .send({
                room_name: 'Jests Test Room',
                password: ''
            })
            .set('Authorization', token);

        roomId = response.body._id;

        expect(response.status).toEqual(200);
        expect(response.body).not.toBeNull();
        expect(Object.keys(response.body).length).toBeGreaterThan(0);
    });

    it('should verify a private room password', async () => {
        const response = await request
            .post('/api/room/verify')
            .send({ room_name: 'Private Room', password: 'private' })
            .set('Authorization', token);

        expect(response.status).toEqual(200);
        expect(response.body).not.toBeNull();
        expect(response.body.success).toBeTruthy();
    });
});

describe('GET /api/room', () => {
    it('should return an array of rooms', async () => {
        const response = await request.get('/api/room').set('Authorization', token);

        expect(response.status).toEqual(200);
        expect(response.body.length).toBeGreaterThan(0);
    });

    it('should get the room by room id', async () => {
        const response = await request
            .get(`/api/room/${roomId.toString()}`)
            .set('Authorization', token);

        expect(response.status).toEqual(200);
        expect(response.body).not.toBeNull();
        expect(Object.keys(response.body).length).toBeGreaterThan(0);
    });
});

describe('PUT /api/room/:room_name', () => {
    it('should update the room name', async () => {
        const response = await request
            .post('/api/room/update/name')
            .send({ room_name: 'Jests Test Room', new_room_name: 'Jest Test Room' })
            .set('Authorization', token);

        expect(response.status).toEqual(200);
        expect(response.body).not.toBeNull();
        expect(response.body.name).toEqual('Jest Test Room');
        expect(Object.keys(response.body).length).toBeGreaterThan(0);
    });
});

describe('DELETE /api/room/:room_name', () => {
    it('should delete a room based on the name', async () => {
        const room_name = 'Jest Test Room';
        let response = await request.delete(`/api/room/${room_name}`).set('Authorization', token);

        expect(response.status).toEqual(200);
        expect(Object.keys(response.body).length).toBeGreaterThan(0);

        response = await request.get('/api/room').set('Authorization', token);

        expect(response.body).not.toContain(room_name);
    });

    it('should return an error with a unknown room name', async () => {
        const room_name = 'Jest sTest Room';
        let response = await request.delete(`/api/room/${room_name}`).set('Authorization', token);

        expect(response.status).toEqual(404);
        expect(Object.keys(response.body).length).toBeGreaterThan(0);
    });
});
