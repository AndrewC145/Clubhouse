import { Router } from 'express';
import { loginValidation, loginUser } from '../src/controllers/loginController';

const loginRouter = Router();

loginRouter.post('/', ...loginValidation, loginUser);

export { loginRouter };
