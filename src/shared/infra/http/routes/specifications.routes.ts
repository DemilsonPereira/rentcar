import { Router } from 'express';

import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated';
import { CreateSpecificationController } from '@modules/cars/useCases/specification/createSpecification/CreateSpecificationController';
import { ListSpecificationsController } from '@modules/cars/useCases/specification/listSpecification/ListCategoriesController';

const specificationRoutes = Router();

const createSpecificationController = new CreateSpecificationController();
const listSpecificationsController = new ListSpecificationsController();

specificationRoutes.use(ensureAuthenticated);
specificationRoutes.post('/', createSpecificationController.handle);

specificationRoutes.get('/', listSpecificationsController.handle);

export { specificationRoutes };
