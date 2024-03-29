import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { CreateCarSpecificationUseCase } from './CreateCarSpecificationUseCase';
import { AppError } from '@shared/errors/AppError';
import { SpecificationsRepositoryInMemory } from '@modules/cars/repositories/in-memory/SpecificationRepositoryInMemory';

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory;

describe('Create Car Specification', () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        specificationsRepositoryInMemory =
            new SpecificationsRepositoryInMemory();
        createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
            carsRepositoryInMemory,
            specificationsRepositoryInMemory
        );
    });

    it('should not be able to add a new specification to a now-existent car', async () => {
        expect(async () => {
            const car_id = '1234';
            const specification_id = ['54321'];

            await createCarSpecificationUseCase.execute({
                car_id,
                specification_id,
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it('should be able to add a new specification to the car', async () => {
        const car = await carsRepositoryInMemory.create({
            name: 'Name Car',
            description: 'Description Car',
            daily_rate: 100,
            license_plate: 'ABC-123',
            fine_amount: 80,
            brand: 'Brand',
            category_id: 'category',
        });

        const specification = await specificationsRepositoryInMemory.create({
            name: 'Teste name',
            description: 'Teste description',
        });

        const specification2 = await specificationsRepositoryInMemory.create({
            name: 'Teste name 2',
            description: 'Teste description 2',
        });

        const specification_id = [specification.id, specification2.id];

        const specificationsCars = await createCarSpecificationUseCase.execute({
            car_id: car.id,
            specification_id,
        });

        expect(specificationsCars).toHaveProperty('specifications');
        expect(specificationsCars.specifications.length).toBe(2);
    });
});
