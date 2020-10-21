import { Router } from 'express';

import { registrationValidation, loginValidation } from '../middlewares/auth-validations';
import { getAllClientsController, registrationController, loginController } from '../controllers';

const router = Router();

router.get('/clients', getAllClientsController);
router.post('/registration', registrationValidation, registrationController);
router.post('/login', loginValidation, loginController);

export default router;
