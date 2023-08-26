import { v4 as uuidV4 } from 'uuid';
import { hash } from 'bcrypt';
import createConnection from '../index';

async function create() {
    const connection = await createConnection('localhost');

    const id = uuidV4();
    const password = await hash('admin', 8);

    await connection.query(
        `INSERT INTO USERS(id, name, email, driver_license, password, "isAdmin", created_at)
        values('${id}', 'admin', 'admin@gmail.com','XXXX', '${password}', true, 'now()')
        `
    );

    await connection.close();
}

create().then(() => {
    console.log('User admin created!');
});
