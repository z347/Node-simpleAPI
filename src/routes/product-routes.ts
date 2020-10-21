import { Router } from 'express';

import { allFieldsValidation, fieldNameValidation, fieldCategoryValidation } from '../middlewares/product-validations';
import {
    createNewProductController,
    getAllProductsController,
    deleteOneProductController,
    getOneProductController,
    getAllProductsByCategoryController,
    editOneProductController
} from '../controllers';

const router = Router();

router.post('/product-create', allFieldsValidation, createNewProductController);
router.get('/products-all', getAllProductsController);
router.delete('/product-delete', fieldNameValidation, deleteOneProductController);
router.get('/product-one', fieldNameValidation, getOneProductController);
router.get('/products-category', fieldCategoryValidation, getAllProductsByCategoryController);
router.patch('/product-update', editOneProductController);

export default router;
