import { CarImage } from '../infra/typeorm/entities/CarImage';

interface ICarsImagesRepository {
    create(car_id: string, image_name: string): Promise<CarImage>;
    findByCarId(car_id: string): Promise<CarImage[]>;
    delete(image_id: string): Promise<void>;
    findByCarIdAndImageName(
        carId: string,
        imageName: string
    ): Promise<CarImage>;
}

export { ICarsImagesRepository };