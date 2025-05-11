import { Router } from 'express';
import { loginValidation, loginUser } from '../src/controllers/loginController';
import passport from 'passport';

const loginRouter = Router();

loginRouter.post('/', ...loginValidation, loginUser);

export { loginRouter };
