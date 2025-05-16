import { Router } from 'express';
import {
  createPost,
  postValidation,
} from '../src/controllers/createPostController';

const postRouter = Router();
postRouter.post('/', ...postValidation, createPost);

export default postRouter;
