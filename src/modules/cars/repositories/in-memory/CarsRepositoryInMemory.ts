import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO';
import { ICarsRepository } from '../ICarsRepository';
import { Car } from '@modules/cars/infra/typeorm/entities/Car';

class CarsRepositoryInMemory implements ICarsRepository {
    cars: Car[] = [];

    async findById(id: string): Promise<Car> {
        return this.cars.find((car) => car.id === id);
    }

    async findAvailable(
        category_id?: string,
        brand?: string,
        name?: string
    ): Promise<Car[]> {
        const allCarAvailable = this.cars.filter((car) => {
            if (
                car.available === true ||
                (brand && car.brand === brand) ||
                (category_id && car.category_id === category_id) ||
                (name && car.name === name)
            ) {
                return car;
            }
            return null;
        });
        return allCarAvailable;
    }

    async findByLicensePlate(license_plate: string): Promise<Car> {
        const car = this.cars.find(
            (car) => car.license_plate === license_plate
        );

        return car;
    }

    async create({
        name,
        description,
        daily_rate,
        license_plate,
        fine_amount,
        brand,
        category_id,
        id,
    }: ICreateCarDTO): Promise<Car> {
        const car = new Car();

        Object.assign(car, {
            name,
            description,
            daily_rate,
            license_plate,
            fine_amount,
            brand,
            category_id,
            id,
        });

        this.cars.push(car);

        return car;
    }
}

export { CarsRepositoryInMemory };
