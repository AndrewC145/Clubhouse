import { Router } from 'express';
import {
  signUpUser,
  registerValidation,
} from '../src/controllers/signUpController';

const signUpRouter = Router();

signUpRouter.post('/', ...registerValidation, signUpUser);

export { signUpRouter };
