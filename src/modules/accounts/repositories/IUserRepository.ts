import { ICreateUserDTO } from '../dtos/ICreateUSerDTO';
import { User } from '../entities/User';

interface IUserRepository {
    create(data: ICreateUserDTO): Promise<void>;
    findByEmail(email: string): Promise<User>;
    findById(id: string): Promise<User>;
}

export { IUserRepository };
