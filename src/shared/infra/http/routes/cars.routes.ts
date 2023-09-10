import { CreateCarController } from '@modules/cars/useCases/car/createCar/CreateCarController';
import { Router } from 'express';
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated';
import { ensureAdmin } from '@shared/infra/http/middlewares/ensureAdmin';
import { ListAvailableCarsController } from '@modules/cars/useCases/car/listAvailableCars/ListAvailableCarsController';
import { CreateCarSpecificationController } from '@modules/cars/useCases/car/createCarSpecification/CreateCarSpecificationController';
import { UploadCarImagesController } from '@modules/cars/useCases/car/uploadCarImages/UploadCarImagesController';

import multer from 'multer';
import uploadConfig from '@config/upload';
import { ListCarImagesController } from '@modules/cars/useCases/car/listCarImages/ListCarImagesController';
import { RemoveCarImagesController } from '@modules/cars/useCases/car/removeCarImages/RemoveCarImagesController';

const carsRoutes = Router();

const uploadCarImages = multer(uploadConfig.upload('./tmp/cars'));

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
const createCarSpecificationController = new CreateCarSpecificationController();
const uploadCarImagesController = new UploadCarImagesController();
const listCarImagesController = new ListCarImagesController();
const removeCarImagesController = new RemoveCarImagesController();

carsRoutes.post(
    '/',
    ensureAuthenticated,
    ensureAdmin,
    createCarController.handle
);

carsRoutes.get('/available', listAvailableCarsController.handle);

carsRoutes.post(
    '/specifications/:id',
    ensureAuthenticated,
    ensureAdmin,
    createCarSpecificationController.handle
);

carsRoutes.get('/images/:id', listCarImagesController.handle);

carsRoutes.post(
    '/images/:id',
    ensureAuthenticated,
    ensureAdmin,
    uploadCarImages.array('images'),
    uploadCarImagesController.handle
);

carsRoutes.delete('/images', removeCarImagesController.handle);

export { carsRoutes };
