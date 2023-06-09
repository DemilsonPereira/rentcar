import { Router } from 'express';
import multer from 'multer';

import { CreateCategoryController } from '@modules/cars/useCases/category/createCategory/CreateCategoryController';
import { ImportCategoryController } from '@modules/cars/useCases/category/importCategory/ImportCategoryController';
import { ListCategoriesController } from '@modules/cars/useCases/category/listCategories/ListCategoriesController';

const categoriesRoutes = Router();
const upload = multer({
    dest: './tmp',
});

const createCategoryController = new CreateCategoryController();
const listCategoriesController = new ListCategoriesController();
const importCategoryController = new ImportCategoryController();

categoriesRoutes.post('/', createCategoryController.handle);

categoriesRoutes.get('/', (request, response) => {
    return listCategoriesController.handle(request, response);
});

categoriesRoutes.post(
    '/import',
    upload.single('file'),
    importCategoryController.handle
);

export { categoriesRoutes };
