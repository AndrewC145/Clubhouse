import { Router } from 'express';
import { loginUser, loginValidation } from '../src/controllers/loginController';

const loginRouter = Router();

loginRouter.post('/', ...loginValidation, loginUser);

export { loginRouter };
