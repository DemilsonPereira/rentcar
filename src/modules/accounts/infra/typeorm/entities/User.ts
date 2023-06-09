import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';
import { v4 as UUIDV4 } from 'uuid';

@Entity('users')
class User {
    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    driver_license: string;

    @Column()
    isAdmin: boolean;

    @Column()
    avatar: string;

    @CreateDateColumn()
    created_at: Date;

    constructor() {
        if (!this.id) {
            this.id = UUIDV4();
        }
    }
}

export { User };
