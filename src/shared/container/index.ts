import { container } from 'tsyringe';

import { UserRepository } from '../../modules/accounts/repositories/implementations/UserRepository';
import { IUserRepository } from '../../modules/accounts/repositories/IUserRepository';
import { ICategoriesRepository } from '../../modules/cars/repositories/ICategoriesRepository';
import { CategoriesRepository } from '../../modules/cars/repositories/implementations/CategoriesRepository';
import { SpecificationRepository } from '../../modules/cars/repositories/implementations/SpecificationsRepository';
import { ISpecificationRepository } from '../../modules/cars/repositories/ISpecificationsRepository';

container.registerSingleton<ICategoriesRepository>(
    'CategoriesRepository',
    CategoriesRepository
);

container.registerSingleton<ISpecificationRepository>(
    'SpecificationRepository',
    SpecificationRepository
);

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);
