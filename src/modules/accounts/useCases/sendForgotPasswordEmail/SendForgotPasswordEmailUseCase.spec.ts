import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';
import { SendForgotPasswordEmailUseCase } from './SendForgotPasswordEmailUseCase';
import { UsersTokensRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { MailProviderInMemory } from '@shared/container/providers/MailProvider/in-memory/MailProviderInMemory';
import { AppError } from '@shared/errors/AppError';

let sendForgotPasswordEmailUseCase: SendForgotPasswordEmailUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let mailProvider: MailProviderInMemory;

describe('Send Forgot Mail', () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        dateProvider = new DayjsDateProvider();
        usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
        mailProvider = new MailProviderInMemory();

        sendForgotPasswordEmailUseCase = new SendForgotPasswordEmailUseCase(
            usersRepositoryInMemory,
            usersTokensRepositoryInMemory,
            dateProvider,
            mailProvider
        );
    });

    it('should be able to send a forgot password email to user', async () => {
        const sendMail = jest.spyOn(mailProvider, 'sendMail');

        await usersRepositoryInMemory.create({
            driver_license: '550796',
            email: 'vu@ervuh.ua',
            name: 'Nicholas Norton',
            password: '1234',
        });

        await sendForgotPasswordEmailUseCase.execute('vu@ervuh.ua');

        expect(sendMail).toHaveBeenCalled();
    });

    it('should not be able to send an email if user does not exists', async () => {
        await expect(
            sendForgotPasswordEmailUseCase.execute('jagfu@omu.se')
        ).rejects.toEqual(new AppError('User does not exists!'));
    });

    it('should be able to create an users token', async () => {
        const generateTokenMail = jest.spyOn(
            usersTokensRepositoryInMemory,
            'create'
        );

        await usersRepositoryInMemory.create({
            driver_license: '669951',
            email: 'gub@naf.sk',
            name: 'Jennie Tyler',
            password: '4321',
        });

        await sendForgotPasswordEmailUseCase.execute('gub@naf.sk');

        expect(generateTokenMail).toBeCalled();
    });
});
