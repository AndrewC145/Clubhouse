import { compare, searchUser } from '../db/queries';
import { NextFunction, Request, Response } from 'express';
import passport from 'passport';
import { body, validationResult } from 'express-validator';
import { Strategy as LocalStrategy } from 'passport-local';

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

passport.use(
  new LocalStrategy(
    async (username: string, password: string, done: Function) => {
      try {
        const user = await compare(username, password);
        if (user === null || user === false) {
          return done(null, false, { message: 'Invalid username or password' });
        }
        return done(null, user);
      } catch (error) {
        console.error('Error in LocalStrategy:', error);
        return done(error);
      }
    }
  )
);

passport.serializeUser((user: any, done: Function) => {
  done(null, user.username);
});

passport.deserializeUser(async (user: string, done: Function) => {
  try {
    let userData = await searchUser(user);
    if (userData) {
      done(null, userData);
    }
  } catch (error) {
    done(error);
  }
});

async function loginUser(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessage = errors.array().map((err) => err.msg);
      return res.status(400).json({ errors: errorMessage });
    }

    passport.authenticate('local', (err: any, user: any, info: any) => {
      if (err) {
        return next(err);
      }

      if (!user) {
        return res.status(401).json({ error: info });
      }

      req.logIn(user, (err: any) => {
        if (err) {
          return next(err);
        }

        return res.status(200).json({ message: 'Login successful', user });
      });
    })(req, res, next);
  } catch (error) {
    console.error('Error in loginUser:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

export { loginValidation, loginUser };
