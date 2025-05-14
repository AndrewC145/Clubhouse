import { Router } from 'express';
import logoutUser from '../src/controllers/logoutController';
const logoutRouter = Router();

logoutRouter.post('/', logoutUser);

export default logoutRouter;
