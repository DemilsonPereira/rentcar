import { CarImage } from '@modules/cars/infra/typeorm/entities/CarImage';
import { ICarsImagesRepository } from '@modules/cars/repositories/ICarsImagesRepository';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

@injectable()
class ListCarImagesUseCase {
    constructor(
        @inject('CarsImagesRepository')
        private carsImagesRepository: ICarsImagesRepository,
        @inject('CarsRepository')
        private carsRepository: ICarsRepository
    ) {}

    async execute(car_id: string): Promise<CarImage[]> {
        const carExists = await this.carsRepository.findById(car_id);

        if (!carExists) {
            throw new AppError('Car does not exist!', 404);
        }

        const images = await this.carsImagesRepository.findByCarId(car_id);

        return images;
    }
}

export { ListCarImagesUseCase };
