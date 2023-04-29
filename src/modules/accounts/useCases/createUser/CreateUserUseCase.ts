import { hash } from 'bcrypt';
import { inject, injectable } from 'tsyringe';
import { Repository } from 'typeorm';

import { ICreateUserDTO } from '../../dtos/ICreateUSerDTO';
import { User } from '../../entities/User';
import { IUserRepository } from '../../repositories/IUserRepository';

@injectable()
class CreateUserUseCase {
    private repository: Repository<User>;

    constructor(
        @inject('UserRepository')
        private usersRepository: IUserRepository
    ) {}

    async execute({
        name,
        email,
        password,
        driver_license,
    }: ICreateUserDTO): Promise<void> {
        const passwordHash = await hash(password, 8);

        const userAlreadyExists = await this.usersRepository.findByEmail(email);

        if (userAlreadyExists) {
            throw new Error('User already exists');
        }

        await this.usersRepository.create({
            name,
            email,
            password: passwordHash,
            driver_license,
        });
    }
}

export { CreateUserUseCase };
