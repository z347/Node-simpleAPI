import { Router } from 'express';

import { getAllCategoryController, creatMainCategoriesController } from '../controllers';

const router = Router();

router.get('/category', getAllCategoryController);
router.post('/category-creat', creatMainCategoriesController);

export default router;
