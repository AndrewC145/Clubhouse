import { addUser, searchUser } from '../db/queries';
import { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';

const registerValidation = [
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
    .notEmpty()
    .trim()
    .exists({ checkFalsy: true })
    .withMessage('Password is required')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
    .matches(/\d/)
    .withMessage('Password must contain at least one number'),

  body('confirmPassword')
    .exists({ checkFalsy: true })
    .withMessage('Confirm Password is required')
    .custom((value, { req }) => value === req.body.password)
    .withMessage('Passwords do not match'),
];

async function signUpUser(req: Request, res: Response): Promise<any> {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessage = errors.array().map((err) => err.msg);
      return res.status(400).json({ errors: errorMessage });
    }
    const { fullName, username, password, adminPerms } = req.body;
    let isAdmin: boolean = false;

    if (adminPerms) {
      isAdmin = true;
    }

    let hashedPassword = await hashPassword(password);

    await addUser(fullName, username, hashedPassword, isAdmin);
    res.status(201).json({ message: 'User created successfully' });
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

export { registerValidation, signUpUser, hashPassword };
