import { Rental } from '@modules/Rental/infra/typeorm/entities/Rental';
import { IRentalRepository } from '../IRentalRepository';
import { ICreateRentalDTO } from '@modules/Rental/dtos/ICreateRentalDTO';

class RentalsRepositoryInMemory implements IRentalRepository {
    rentals: Rental[] = [];

    async findOpenRentalByCar(car_id: string): Promise<Rental> {
        return this.rentals.find(
            (rental) => rental.car_id === car_id && !rental.end_date
        );
    }

    async findOpenRentalByUser(user_id: string): Promise<Rental> {
        return this.rentals.find(
            (rental) => rental.user_id === user_id && !rental.end_date
        );
    }

    async create({
        user_id,
        car_id,
        expected_return_date,
        id,
        end_date,
        total,
    }: ICreateRentalDTO): Promise<Rental> {
        const rental = new Rental();

        Object.assign(rental, {
            user_id,
            car_id,
            expected_return_date,
            start_date: new Date(),
            id,
            end_date,
            total,
        });

        this.rentals.push(rental);

        return rental;
    }

    async finById(id: string): Promise<Rental> {
        return this.rentals.find((rental) => rental.id === id);
    }

    async findByUser(user_id: string): Promise<Rental[]> {
        return this.rentals.filter((rental) => {
            rental.user_id === user_id;
        });
    }
}

export { RentalsRepositoryInMemory };
