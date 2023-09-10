import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { CreateCarUSeCase } from './CreateCarUseCase';
import { AppError } from '@shared/errors/AppError';

let createCarUseCase: CreateCarUSeCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('Create Car', () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        createCarUseCase = new CreateCarUSeCase(carsRepositoryInMemory);
    });

    it('should be able to create a new car', async () => {
        const car = await createCarUseCase.execute({
            name: 'Name Car',
            description: 'Description Car',
            daily_rate: 100,
            license_plate: 'ABC-123',
            fine_amount: 80,
            brand: 'Brand',
            category_id: 'category',
        });

        expect(car).toHaveProperty('id');
    });

    it('should not be able to create a new car with license plate exists', async () => {
        expect(async () => {
            const car1 = {
                name: 'Car 1',
                description: 'Description Car',
                daily_rate: 100,
                license_plate: 'ABC-123',
                fine_amount: 80,
                brand: 'Brand',
                category_id: 'category',
            };

            const car2 = {
                name: 'Car 2',
                description: 'Description Car',
                daily_rate: 100,
                license_plate: 'ABC-123',
                fine_amount: 80,
                brand: 'Brand',
                category_id: 'category',
            };

            await createCarUseCase.execute({
                name: car1.name,
                description: car1.description,
                daily_rate: car1.daily_rate,
                license_plate: car1.license_plate,
                fine_amount: car1.fine_amount,
                brand: car1.brand,
                category_id: car1.category_id,
            });

            await createCarUseCase.execute({
                name: car2.name,
                description: car2.description,
                daily_rate: car2.daily_rate,
                license_plate: car2.license_plate,
                fine_amount: car2.fine_amount,
                brand: car2.brand,
                category_id: car2.category_id,
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it('should be able to create a new car with available true by defauld', async () => {
        const car = await createCarUseCase.execute({
            name: 'Car Available',
            description: 'Description Car',
            daily_rate: 100,
            license_plate: 'ABC-123',
            fine_amount: 80,
            brand: 'Brand',
            category_id: 'category',
        });

        expect(car.available).toBe(true);
    });
});
