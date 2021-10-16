
const request = require('supertest');
const app = require('../test/testserver');
import mongoose from 'mongoose'
import config from '../config/config';
import logging from '../config/logging';



beforeAll(async () => {
    await mongoose
        .connect(config.mongo.url, config.mongo.options)
        .then(() => {
            logging.info('Mongo Connected')
        })
        .catch((error: any) => {
            logging.error(error)
        })

})
let token: any;


beforeAll(async () => {
    request(app)
        .post('/api/users/login')
        .send({
            name: 'roycetest',
            password: 'test1234',
        })
        .end((err: any, response: { body: { token: any; }; }) => {
            token = response.body.token;
            console.log('this is token', token, response.body)// save the token!

        });
});

afterAll(async () => {
    try {
        await mongoose.connection.close()
    } catch (err) {
        console.log(err)
    }
    // Closing the DB connection allows Jest to exit successfully.


})


describe('Post Endpoints', () => {
    //to add users to database, uncomment to use
    // describe('Add User', () => {
    //     it('should create a new user', async () => {
    //         const res = await request(app)
    //             .post('/api/users/register')
    //             .send({
    //                 name: 'roycetest',
    //                 password: 'test1234',
    //                 dob: '01/01/1900',
    //                 address: 'Address',
    //                 description: 'Description',
    //             })
    //         expect(res.statusCode).toEqual(201)
    //         expect(res.body).toHaveProperty('user')
    //     })

    // })

    describe('Fetch Users', () => {
        it('should fetch all users', async () => {
            const res = await request(app).get('/api/users');
            expect(res.statusCode).toEqual(200);
            expect(res.body.count).toBe(12);
        });
        it('Update should require autorization', async () => {
            const res = await request(app).get('/api/users/findUser/616a805170dbc310d3a8244a');
            expect(res.statusCode).toEqual(401);
            expect(res.body.message).toBe('Unauthorized')

        });
        it('It should update a single user', async () => {
            const res = await request(app).get('/api/users/findUser/616a77de70018324884c9940').set('Authorization', `Bearer ${token}`).send({ name: 'Adedayo' })
            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('user')

        });

    })
    describe('Test Auth Failure', () => {
        it('It should require authorization', () => {
            return request(app)
                .post('/api/users/login')
                .then((response: { statusCode: any; }) => {
                    expect(response.statusCode).toBe(401);
                });
        });
    });

    describe('Test Update', () => {
        it('Update Single User', async () => {
            const res = await request(app).patch('/api/users/updateUser/616a805170dbc310d3a8244a').send({ name: 'Adedayo' });
            expect(res.statusCode).toEqual(401);
            expect(res.body.message).toBe('Unauthorized')

        });
        it('It should update a single user', async () => {
            const res = await request(app).patch('/api/users/updateUser/6168d8e2c185d01a8786329c').set('Authorization', `Bearer ${token}`).send({ name: 'Adedayo' })
            expect(res.statusCode).toBe(201);
            expect(res.body.message).toBe('User information updated');
        });

    });

    describe('Test Delete Users', () => {
        it('Update should delete user from DB', async () => {
            const res = await request(app).delete('/api/users/deleteUser/616a75c95fa3b44d2e164ebb');
            expect(res.statusCode).toEqual(401);
            expect(res.body.message).toBe('Unauthorized')
        });
        //to add delete users to database, uncomment to use
        // it('It should update a single user', async () => {
        //     const res = await request(app).delete('/api/users/deleteUser/616a7638b181a381027c1967').set('Authorization', `Bearer ${token}`).send({ name: 'Adedayo' })
        //     expect(res.statusCode).toBe(201);
        //     expect(res.body.message).toBe('User data deleted');
        // });
    });
    // send the token - should respond with a 200

})