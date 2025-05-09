import { addUser, searchUser } from '../db/queries';
import { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import { error } from 'console';

export const registerValidation = [
  body('fullName')
    .notEmpty()
    .trim()
    .isAlpha('en-US', { ignore: ' ' })
    .withMessage('Fullname must be alphabetic and not empty'),
  body('username')
    .notEmpty()
    .trim()
    .isAlphanumeric()
    .withMessage('Username must be alphanumeric and not empty')
    .custom(async (value) => {
      const existingUser = await searchUser(value);
      if (existingUser) {
        throw new Error('Username already in use');
      }
    }),

  body('password')
    .exists({ checkFalsy: true })
    .withMessage('Password is required'),

  body('confirmPassword')
    .exists({ checkFalsy: true })
    .withMessage('Confirm Password is required')
    .custom((value, { req }) => value === req.body.password)
    .withMessage('Passwords do not match'),
];

export async function signUpUser(req: Request, res: Response): Promise<any> {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessage = errors.array().map((err) => err.msg);
      return res.status(400).json({ errors: errorMessage });
    }
    const { fullName, username, password } = req.body;
    let hashedPassword = await hashPassword(password);

    await addUser(fullName, username, hashedPassword);
    return res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error in signUpUser:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}
