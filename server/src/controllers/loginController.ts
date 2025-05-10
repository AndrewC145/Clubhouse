import { compare } from '../db/queries';
import { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

const loginValidation = [
  body('username')
    .notEmpty()
    .trim()
    .isAlphanumeric()
    .withMessage('Username must be alphanumeric and not empty'),

  body('password')
    .exists({ checkFalsy: true })
    .withMessage('Password is required'),
];

async function loginUser(req: Request, res: Response): Promise<any> {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessage = errors.array().map((err) => err.msg);
      return res.status(400).json({ errors: errorMessage });
    }

    const { username, password } = req.body;
    let user = await compare(username, password);

    if (user === null || user === false) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    return res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    console.error('Error in loginUser:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

export { loginUser, loginValidation };
