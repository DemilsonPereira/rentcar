import { Router } from 'express';

import { CreateSpecificationController } from '../modules/cars/useCases/specification/createSpecification/CreateSpecificationController';
import { ListSpecificationsController } from '../modules/cars/useCases/specification/listSpecification/ListCategoriesController';

const specificationRoutes = Router();

const createSpecificationController = new CreateSpecificationController();
const listSpecificationsController = new ListSpecificationsController();

specificationRoutes.post('/', createSpecificationController.handle);

specificationRoutes.get('/', listSpecificationsController.handle);

export { specificationRoutes };
