import { Repository, getRepository } from 'typeorm';
import { ICreateRentalDTO } from '@modules/Rental/dtos/ICreateRentalDTO';
import { IRentalRepository } from '@modules/Rental/repositories/IRentalRepository';
import { Rental } from '../entities/Rental';

class RentalsRepository implements IRentalRepository {
    private repository: Repository<Rental>;

    constructor() {
        this.repository = getRepository(Rental);
    }

    async findOpenRentalByCar(car_id: string): Promise<Rental> {
        const openByCAr = await this.repository.findOne({ car_id });

        return openByCAr;
    }

    async findOpenRentalByUser(user_id: string): Promise<Rental> {
        const openByUser = await this.repository.findOne({ user_id });

        return openByUser;
    }

    async create({
        user_id,
        car_id,
        expected_return_date,
    }: ICreateRentalDTO): Promise<Rental> {
        const rental = this.repository.create({
            user_id,
            car_id,
            expected_return_date,
        });

        await this.repository.save(rental);

        return rental;
    }
}

export { RentalsRepository };
