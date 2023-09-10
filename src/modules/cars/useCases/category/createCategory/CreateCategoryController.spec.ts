import request from 'supertest';
import { app } from '@shared/infra/http/app';
import { hash } from 'bcrypt';
import { v4 as uuidV4 } from 'uuid';

import createConnection from '@shared/infra/typeorm';
import { Connection } from 'typeorm';

let connection: Connection;

describe('Create Category Controller', () => {
    beforeAll(async () => {
        connection = await createConnection();
        await connection.runMigrations();

        const id = uuidV4();
        const password = await hash('admin', 8);

        await connection.query(
            `INSERT INTO USERS(id, name, email, driver_license, password, "isAdmin", created_at)
        values('${id}', 'admin', 'admin@gmail.com','XXXX', '${password}', true, 'now()')
        `
        );
    });

    afterAll(async () => {
        await connection.dropDatabase();
        await connection.close();
    });

    it('should be able to create a new category', async () => {
        const responseToken = await request(app).post('/sessions').send({
            email: 'admin@gmail.com',
            password: 'admin',
        });

        const { token } = responseToken.body;

        const response = await request(app)
            .post('/categories')
            .send({
                name: 'Category SuperTest',
                description: 'Category SuperTest',
            })
            .set({ Authorization: `Bearer ${token}` });

        expect(response.status).toBe(201);
    });

    it('should not be able to create a new category with name exists', async () => {
        const responseToken = await request(app).post('/sessions').send({
            email: 'admin@gmail.com',
            password: 'admin',
        });

        const { token } = responseToken.body;

        const response = await request(app)
            .post('/categories')
            .send({
                name: 'Category SuperTest',
                description: 'Category SuperTest',
            })
            .set({ Authorization: `Bearer ${token}` });

        expect(response.status).toBe(400);
    });
});
