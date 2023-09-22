import { Rental } from '@modules/Rental/infra/typeorm/entities/Rental';
import { IRentalRepository } from '@modules/Rental/repositories/IRentalRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
class ListRentalsByUserUseCase {
    constructor(
        @inject('RentalsRepository')
        private rentalsRepository: IRentalRepository
    ) {}
    async execute(user_id: string): Promise<Rental[]> {
        const rentalsByUser = await this.rentalsRepository.findByUser(user_id);

        return rentalsByUser;
    }
}

export { ListRentalsByUserUseCase };
