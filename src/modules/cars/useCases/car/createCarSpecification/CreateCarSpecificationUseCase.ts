import { Car } from '@modules/cars/infra/typeorm/entities/Car';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { ISpecificationsRepository } from '@modules/cars/repositories/ISpecificationsRepository';
import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

interface IRequest {
    car_id: string;
    specification_id: string[];
}

@injectable()
class CreateCarSpecificationUseCase {
    constructor(
        @inject('CarsRepository')
        private carsRepository: ICarsRepository,
        @inject('SpecificationsRepository')
        private specificationsRepository: ISpecificationsRepository
    ) {}
    async execute({ car_id, specification_id }: IRequest): Promise<Car> {
        console.log(car_id, specification_id);

        const carExists = await this.carsRepository.findById(car_id);

        if (!carExists) {
            throw new AppError('Car does not exist!');
        }

        const specifications = await this.specificationsRepository.findByIds(
            specification_id
        );

        console.log(specifications);

        carExists.specifications = specifications;

        console.log(carExists)
        await this.carsRepository.create(carExists);


        return carExists;
    }
}

export { CreateCarSpecificationUseCase };
