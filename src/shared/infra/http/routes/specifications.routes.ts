import { Router } from 'express';

import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated';
import { CreateSpecificationController } from '@modules/cars/useCases/specification/createSpecification/CreateSpecificationController';
import { ListSpecificationsController } from '@modules/cars/useCases/specification/listSpecification/ListCategoriesController';
import { ensureAdmin } from '@shared/infra/http/middlewares/ensureAdmin';

const specificationRoutes = Router();

const createSpecificationController = new CreateSpecificationController();
const listSpecificationsController = new ListSpecificationsController();

// specificationRoutes.use(ensureAuthenticated); // esse midlware serve para que as rotas abaixo o usuario esteja autenticado

specificationRoutes.get('/', listSpecificationsController.handle);

specificationRoutes.post(
    '/',
    ensureAuthenticated,
    ensureAdmin,
    createSpecificationController.handle
);

export { specificationRoutes };
