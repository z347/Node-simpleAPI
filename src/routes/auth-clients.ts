import { Router } from 'express';

import { registrationValidation, loginValidation } from '../middlewares/auth-validations';
import { registrationController, loginController } from '../controllers/auth-clients';

const router = Router();

router.post('/registration', registrationValidation, registrationController);
router.post('/login', loginValidation, loginController);

export default router;
