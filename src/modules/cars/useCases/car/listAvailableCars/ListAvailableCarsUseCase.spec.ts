import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { ListAvailableCarsUseCase } from './ListAvailableCarsUseCase';

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('List Car', () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory);
    });

    it('should be able to list all available cars', async () => {
        const car = await carsRepositoryInMemory.create({
            name: 'Name Car',
            description: 'Description Car',
            daily_rate: 100,
            license_plate: 'ABC-123',
            fine_amount: 80,
            brand: 'Brand',
            category_id: 'category_id',
        });

        const cars = await listAvailableCarsUseCase.execute({});

        expect(cars).toEqual([car]);
    });

    it('should be able to list all availble cars by brand', async () => {
        const car = await carsRepositoryInMemory.create({
            name: 'Name Car',
            description: 'Description Car',
            daily_rate: 100,
            license_plate: 'ABC-123',
            fine_amount: 80,
            brand: 'Car_Brand_filter',
            category_id: 'category_id',
        });

        const cars = await listAvailableCarsUseCase.execute({
            brand: 'Car_Brand_filter',
        });

        expect(cars).toEqual([car]);
    });

    it('should be able to list all availble cars by name', async () => {
        const car = await carsRepositoryInMemory.create({
            name: 'Car3',
            description: 'Description Car',
            daily_rate: 100,
            license_plate: 'ABC-123',
            fine_amount: 80,
            brand: 'Car3_Brand_filter',
            category_id: 'category_id',
        });

        const cars = await listAvailableCarsUseCase.execute({
            name: 'Car3',
        });

        expect(cars).toEqual([car]);
    });

    it('should be able to list all availble cars by category', async () => {
        const car = await carsRepositoryInMemory.create({
            name: 'Car3',
            description: 'Description Car',
            daily_rate: 100,
            license_plate: 'ABC-123',
            fine_amount: 80,
            brand: 'Car3_Brand_filter',
            category_id: '123456',
        });

        const cars = await listAvailableCarsUseCase.execute({
            category_id: '123456',
        });

        expect(cars).toEqual([car]);
    });
});
