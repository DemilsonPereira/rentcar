import { Rental } from '@modules/Rental/infra/typeorm/entities/Rental';
import { IRentalRepository } from '@modules/Rental/repositories/IRentalRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

interface IRequest {
    user_id: string;
    car_id: string;
    expected_return_date: Date;
}

@injectable()
class CreateRentalUseCase {
    constructor(
        @inject('RentalsRepository')
        private rentalRepository: IRentalRepository,
        @inject('DayjsDateProvider')
        private dateProvider: IDateProvider
    ) {}

    async execute({
        user_id,
        car_id,
        expected_return_date,
    }: IRequest): Promise<Rental> {
        const minimumHour = 24;
        const carUnavailabe = await this.rentalRepository.findOpenRentalByCar(
            car_id
        );

        if (carUnavailabe) {
            throw new AppError('Car is unavailable');
        }

        const rentalOPenToUser =
            await this.rentalRepository.findOpenRentalByUser(user_id);

        if (rentalOPenToUser) {
            throw new AppError("There's a rental in progress for user!");
        }

        const dateNow = this.dateProvider.dateNow();

        const compare = this.dateProvider.compareInHours(
            dateNow,
            expected_return_date
        );

        if (compare < minimumHour) {
            throw new AppError('Invalid return time!');
        }

        const rental = await this.rentalRepository.create({
            user_id,
            car_id,
            expected_return_date,
        });

        return rental;
    }
}

export { CreateRentalUseCase };
