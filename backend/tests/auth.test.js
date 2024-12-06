const request = require('supertest');
const app = require('../app'); 
const mongoose = require('mongoose');

describe('Authentication Routes', () => {

    // Run this before all tests
    beforeAll(async () => {
        // Connect to a test database if required
        const url = `mongodb://127.0.0.1/auth_test_db`;
        await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
    });

    // Run this after all tests
    afterAll(async () => {
        // Close the database connection
        await mongoose.connection.close();
    });

    describe('POST /auth/register', () => {
        it('should register a new user', async () => {
            const res = await request(app)
                .post('/auth/register')
                .send({
                    name: 'Test User',
                    email: 'test@example.com',
                    password: 'password123'
                });

            expect(res.statusCode).toEqual(201);
            expect(res.body).toHaveProperty('token');
        });

        it('should not register a user with an existing email', async () => {
            const res = await request(app)
                .post('/auth/register')
                .send({
                    name: 'Test User',
                    email: 'test@example.com',
                    password: 'password123'
                });

            expect(res.statusCode).toEqual(400);
            expect(res.body).toHaveProperty('message', 'Email already exists');
        });
    });

    describe('POST /auth/login', () => {
        it('should login an existing user', async () => {
            const res = await request(app)
                .post('/auth/login')
                .send({
                    email: 'test@example.com',
                    password: 'password123'
                });

            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('token');
        });

        it('should not login with incorrect credentials', async () => {
            const res = await request(app)
                .post('/auth/login')
                .send({
                    email: 'test@example.com',
                    password: 'wrongpassword'
                });

            expect(res.statusCode).toEqual(401);
            expect(res.body).toHaveProperty('message', 'Invalid credentials');
        });
    });

    describe('POST /auth/logout', () => {
        it('should logout a user', async () => {
            
            const res = await request(app)
                .post('/auth/logout')
                .set('Authorization', `Bearer some-token`)
                .send();

            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('message', 'Logged out successfully');
        });
    });
});
