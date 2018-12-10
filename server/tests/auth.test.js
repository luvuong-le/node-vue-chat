const { app } = require('../server');
const supertest = require('supertest');
const { userSeedData } = require('./seed/seedData');
const slugify = require('slugify');

describe('POST /auth', () => {
    let request = supertest(app);

    it('should register a user and return a token', async () => {
        const response = await request.post('/api/auth/register').send({
            handle: slugify('newUser100'),
            email: 'newUser@gmail.com',
            username: 'newUser100',
            password: 'newUserTest'
        });

        expect(response.status).toEqual(200);
        expect(response.body.user.session_id).not.toBeNull();
        expect(response.body.token).not.toBeNull();
        expect(response.body.auth).not.toBeNull();
    });

    it('shouldnt register with invalid details', async () => {
        const response = await request.post('/api/auth/register').send({
            email: 'test100@hotmail.com',
            username: 'test',
            password: 'testing100'
        });

        expect(response.status).toEqual(200);
        expect(typeof response.body).toBe('object');
        expect(response.body).not.toBeNull();
    });

    it('should login a user and return a token', async () => {
        const response = await request
            .post('/api/auth/login')
            .send({ email: userSeedData[0].email, password: userSeedData[0].password });

        expect(response.status).toEqual(200);
        expect(response.body.token).not.toBeNull();
        expect(response.body.user.session_id).not.toBeNull();
        expect(response.body.auth).not.toBeNull();
    });

    it('should return an object given the wrong login details', async () => {
        const response = await request
            .post('/api/auth/login')
            .send({ email: 'testwrongemail@hotmail.com', password: 'testing123' });

        expect(response.status).toEqual(200);
        expect(typeof response.body).toBe('object');
    });
});

/** Watch Mode: Repopulate UserData after auth tests finish running (Due to auth testing for registration) */
// afterAll(async () => {
//     await populateData();
// })
