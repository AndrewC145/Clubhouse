import { Router } from 'express';
import deletePostController from '../src/controllers/deletePostController';

const deleteRouter = Router();
deleteRouter.delete('/:id', deletePostController);

export default deleteRouter;
