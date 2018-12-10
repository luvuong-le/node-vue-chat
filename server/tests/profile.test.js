const { app } = require('../server');
const { userSeedData } = require('./seed/seedData');
const supertest = require('supertest');
const slugify = require('slugify');

let token;
let request = supertest(app);

beforeAll(async () => {
    const response = await request
        .post('/api/auth/login')
        .send({ email: userSeedData[0].email, password: userSeedData[0].password });

    token = response.body.token;
});

describe('GET /profile', () => {
    it('should return the user data based on user handle', async () => {
        const response = await request
            .get(`/api/profile/${slugify(userSeedData[0].username)}`)
            .set('Authorization', token);

        expect(response.status).toBe(200);
        expect(response.body).not.toBeNull();
    });
});
