import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../../errors/AppError';
import { UserRepository } from '../../repositories/implementations/UserRepository';

interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: {
        name: string;
        email: string;
    };
    token: string;
}

@injectable()
class AuthenticateUserUseCase {
    constructor(
        @inject('UserRepository')
        private userRepository: UserRepository
    ) {}

    async execute({ email, password }: IRequest): Promise<IResponse> {
        const user = await this.userRepository.findByEmail(email);

        if (!user) {
            throw new AppError('Email or password incorrect');
        }

        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch) {
            throw new AppError('Email or password incorrect');
        }

        const token = sign({}, '98553fd63f10cf3aed6a49a19335be47', {
            subject: user.id,
            expiresIn: '1d',
        });

        const returnToken: IResponse = {
            user: {
                name: user.name,
                email: user.email,
            },
            token,
        };

        return returnToken;
    }
}

export { AuthenticateUserUseCase };
