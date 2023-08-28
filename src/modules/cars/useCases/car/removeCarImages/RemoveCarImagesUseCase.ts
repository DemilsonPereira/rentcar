import { CarImage } from '@modules/cars/infra/typeorm/entities/CarImage';
import { ICarsImagesRepository } from '@modules/cars/repositories/ICarsImagesRepository';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

interface IRequest {
    image_ids: string[];
    car_id: string;
}

@injectable()
class RemoveCarImagesUseCase {
    constructor(
        @inject('CarsImagesRepository')
        private carsImagesRepository: ICarsImagesRepository,
        @inject('CarsRepository')
        private carsRepository: ICarsRepository
    ) {}
    async execute({ car_id, image_ids }: IRequest): Promise<void> {
        console.log("UseCase");

        const carExists = await this.carsRepository.findById(car_id);

        if (!carExists) {
            throw new AppError('Car does not exist!', 404);
        }

        const images = await this.carsImagesRepository.findByCarId(car_id);

        if (images.length === 0) {
            throw new AppError('No images found for this car!', 404);
        }

        const imagesToDelete = images.filter((image) =>
            image_ids.includes(image.id)
        );

        if (imagesToDelete.length === 0) {
            throw new AppError('No matching images found for deletion!', 404);
        }

        await Promise.all(
            imagesToDelete.map((image) =>
                this.carsImagesRepository.delete(image.id)
            )
        );
    }
}

export { RemoveCarImagesUseCase };
