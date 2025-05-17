import { addPost } from '../db/postQueries';
import { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { format } from 'date-fns';

type User = {
  id: number;
  fullname: string;
  username: string;
  password: string;
};

const postValidation = [
  body('title').notEmpty().trim().withMessage('Title is required'),

  body('content')
    .notEmpty()
    .trim()
    .withMessage('Content is required')
    .isLength({ min: 10, max: 400 })
    .withMessage('Content must be between 10 and 400 characters long'),
];

async function createPost(req: Request, res: Response): Promise<any> {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessage = errors.array().map((err) => err.msg);
      return res.status(400).json({ errors: errorMessage });
    }

    const user = req.user as User;
    const { title, content } = req.body;

    await addPost(
      user.username,
      title,
      content,
      format(new Date(), 'yyyy-MM-dd')
    );
    return res.status(201).json({ message: 'Post created successfully' });
  } catch (error) {
    console.error('Error in createPost:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

export { createPost, postValidation };
