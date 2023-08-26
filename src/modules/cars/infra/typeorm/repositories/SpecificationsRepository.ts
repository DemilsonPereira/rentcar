import {
    ICreateSpecificationDTO,
    ISpecificationsRepository,
} from '@modules/cars/repositories/ISpecificationsRepository';
import { Repository, getRepository } from 'typeorm';
import { Specification } from '@modules/cars/infra/typeorm/entities/Specification';

class SpecificationsRepository implements ISpecificationsRepository {
    private repository: Repository<Specification>;

    constructor() {
        this.repository = getRepository(Specification);
    }

    async findByIds(ids: string[]): Promise<Specification[]> {
        const specifications = await this.repository.findByIds(ids);
        return specifications;
    }

    async create({
        name,
        description,
    }: ICreateSpecificationDTO): Promise<Specification> {
        const specification = this.repository.create({
            name,
            description,
        });

        await this.repository.save(specification);

        return specification;
    }

    async list(): Promise<Specification[]> {
        const repository = await this.repository.find();
        return repository;
    }

    async findByName(name: string): Promise<Specification> {
        const specification = await this.repository.findOne({ name });

        return specification;
    }
}

export { SpecificationsRepository };
