import { ICarsImagesRepository } from '@modules/cars/repositories/ICarsImagesRepository';
import { CarImage } from '../entities/CarImage';
import { Repository, getRepository } from 'typeorm';
import fs from 'fs/promises';
import path from 'path';
import { AppError } from '@shared/errors/AppError';

class CarsImagesRepository implements ICarsImagesRepository {
    private repository: Repository<CarImage>;

    constructor() {
        this.repository = getRepository(CarImage);
    }

    async findByCarIdAndImageName(
        carId: string,
        imageName: string
    ): Promise<CarImage> {
        const image = await this.repository.findOne({
            where: {
                car_id: carId,
                image_name: imageName,
            },
        });

        return image;
    }

    async delete(image_id: string): Promise<void> {
        console.log(image_id);

        const carImage = await this.repository.findOne(image_id);
        console.log(carImage);

        if (!carImage) {
            throw new Error('Car image not found');
        }

        const imagePath = path.join('tmp', 'cars', carImage.image_name);

        console.log(imagePath);

        await fs.unlink(imagePath);

        await this.repository.delete(image_id);
    }

    async findByCarId(car_id: string): Promise<CarImage[]> {
        const images = await this.repository.find({
            where: { car_id },
        });

        return images;
    }

    async create(car_id: string, image_name: string): Promise<any> {
        const imageNameWithoutHash = image_name.split('-')[1];

        const images = await this.repository.find();

        const existingImageNamesWithoutHash = images.map(
            (image) => image.image_name.split('-')[1]
        );

        console.log(existingImageNamesWithoutHash);

        const filesInDirectory = await this.listFilesInCarsDirectory();

        const existingImageNamesWithoutHashTmpCars = filesInDirectory.map(
            (image) => image.split('-')[1]
        );
        console.log(existingImageNamesWithoutHashTmpCars);

        if (existingImageNamesWithoutHash.includes(imageNameWithoutHash)) {
            throw new AppError(
                'Image with the same name already exists for this car.',
                404
            );
        }

        if (filesInDirectory.includes(imageNameWithoutHash)) {
            throw new AppError(
                'Image with the same name already exists in the folder.',
                404
            );
        }

        const carImage = this.repository.create({
            car_id,
            image_name,
        });

        await this.repository.save(carImage);

        return carImage;
    }

    async listFilesInCarsDirectory(): Promise<string[]> {
        const directoryPath = path.join('tmp', 'cars');

        try {
            const files = await fs.readdir(directoryPath);
            return files;
        } catch (error) {
            console.error(`Error listing files: ${error.message}`);
            return [];
        }
    }
}

export { CarsImagesRepository };
