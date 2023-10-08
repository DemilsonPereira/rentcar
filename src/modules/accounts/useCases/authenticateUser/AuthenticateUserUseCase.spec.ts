import { UsersTokensRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory';
import { AppError } from '../../../../shared/errors/AppError';
import { ICreateUserDTO } from '../../dtos/ICreateUSerDTO';
import { UsersRepositoryInMemory } from '../../repositories/in-memory/UsersRepositoryInMemory';
import { CreateUserUseCase } from '../createUser/CreateUserUseCase';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let createUserUserCase: CreateUserUseCase;

describe('Authenticate User', () => {
    beforeEach(async () => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
        dateProvider = new DayjsDateProvider();
        authenticateUserUseCase = new AuthenticateUserUseCase(
            usersRepositoryInMemory,
            usersTokensRepositoryInMemory,
            dateProvider
        );
        createUserUserCase = new CreateUserUseCase(usersRepositoryInMemory);
    });

    it('should be able to authenticate an user', async () => {
        const user: ICreateUserDTO = {
            name: 'User Test',
            email: 'user@test.com',
            password: '123',
            driver_license: '000123',
        };

        await createUserUserCase.execute(user);

        const result = await authenticateUserUseCase.execute({
            email: user.email,
            password: user.password,
        });

        expect(result).toHaveProperty('token');
    });

    it('should not be able to authenticate an nonexistent user', async () => {
        await expect(
            authenticateUserUseCase.execute({
                email: 'false@example.com',
                password: '123',
            })
        ).rejects.toEqual(new AppError('Email or password incorrect!'));
    });

    it('should not be able to authenticate with incorrect password', async () => {
        const user: ICreateUserDTO = {
            name: 'User Test Error',
            email: 'user2@test2.com',
            password: '1234',
            driver_license: '9999',
        };

        await createUserUserCase.execute(user);

        await expect(
            authenticateUserUseCase.execute({
                email: user.email,
                password: 'incorrectpassword',
            })
        ).rejects.toEqual(new AppError('Email or password incorrect!'));
    });
});
