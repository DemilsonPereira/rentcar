import { SpecificationRepository } from '../../../repositories/implementations/SpecificationRepository';
import { ListSpecificationsController } from './ListCategoriesController';
import { ListSpecificationsUseCase } from './ListSpecificationUseCase';

const specificationRepository = SpecificationRepository.getInstance();

const listSpecificationsUseCase = new ListSpecificationsUseCase(
    specificationRepository
);

const listSpecificationsController = new ListSpecificationsController(
    listSpecificationsUseCase
);

export { listSpecificationsController };
