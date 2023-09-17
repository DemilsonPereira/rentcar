import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';
import { Repository, getRepository } from 'typeorm';
import { UserTokens } from '../entities/UserTokens';
import { ICreateUserTokenDTO } from '@modules/accounts/dtos/ICreateUserTokenDTO';

class UsersTokensRepository implements IUsersTokensRepository {
    private repository: Repository<UserTokens>;

    constructor() {
        this.repository = getRepository(UserTokens);
    }

    async create({
        refresh_token,
        user_id,
        expires_date,
    }: ICreateUserTokenDTO): Promise<UserTokens> {
        const userToken = this.repository.create({
            refresh_token,
            user_id,
            expires_date,
        });

        await this.repository.save(userToken);

        return userToken;
    }
}

export { UsersTokensRepository };
