import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { Car } from '../entities/Car';
import { Repository, getRepository } from 'typeorm';

class CarsRepository implements ICarsRepository {
    private repository: Repository<Car>;

    constructor() {
        this.repository = getRepository(Car);
    }
    async findById(id: string): Promise<Car> {
        const car = await this.repository.findOne(id);
        return car;
    }

    async findAvailable(
        category_id?: string,
        brand?: string,
        name?: string
    ): Promise<Car[]> {
        const carsQuery = await this.repository
            .createQueryBuilder('cars')
            .where('available = :available', { available: true });

        if (category_id) {
            carsQuery.andWhere('category_id= :category_id', {
                category_id,
            });
        }

        if (brand) {
            carsQuery.andWhere('brand= :brand', { brand });
        }

        if (name) {
            carsQuery.andWhere('name= :name', { name });
        }

        const cars = await carsQuery.getMany();

        return cars;
    }

    async findByLicensePlate(license_plate: string): Promise<Car> {
        const car = await this.repository.findOne({ license_plate });
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
        specifications,
        id,
    }: ICreateCarDTO): Promise<Car> {
        const car = this.repository.create({
            name,
            description,
            daily_rate,
            license_plate,
            fine_amount,
            brand,
            category_id,
            specifications,
            id,
        });

        await this.repository.save(car);

        return car;
    }
}

export { CarsRepository };
