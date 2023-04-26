import { Router } from 'express';

import { createSpecificationController } from '../modules/cars/useCases/specification/createSpecification';
import { listSpecificationsController } from '../modules/cars/useCases/specification/listSpecification';

const specificationRoutes = Router();

specificationRoutes.post('/', (request, response) => {
    return createSpecificationController.handle(request, response);
});

specificationRoutes.get('/', (request, response) => {
    return listSpecificationsController.handle(request, response);
});

export { specificationRoutes };
