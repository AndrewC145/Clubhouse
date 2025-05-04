import { Router } from 'express';
import { signUpUser } from '../src/controllers/signUpController';

const signUpRouter = Router();

signUpRouter.post('/', signUpUser);

export { signUpRouter };
