import request from 'supertest';
import { app } from '@shared/infra/http/app';
import { hash } from 'bcrypt';
import { v4 as uuidV4 } from 'uuid';

import createConnection from '@shared/infra/typeorm';
import { Connection } from 'typeorm';

let connection: Connection;

describe('List Category Controller', () => {
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

    it('should be able to list all category', async () => {
        const responseToken = await request(app).post('/sessions').send({
            email: 'admin@gmail.com',
            password: 'admin',
        });

        const { token } = responseToken.body;

        await request(app)
            .post('/categories')
            .send({
                name: 'Category SuperTest',
                description: 'Category SuperTest',
            })
            .set({ Authorization: `Bearer ${token}` });

        const response = await request(app).get('/categories');

        expect(response.status).toBe(200);
        expect(response.body.length).toBe(1);
        expect(response.body[0]).toHaveProperty('id');
        expect(response.body[0].name).toEqual('Category SuperTest');
    });
});
