import { Request, Response, NextFunction } from 'express';

async function logoutUser(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  req.logout((err: any) => {
    if (err) {
      return next(err);
    }

    res.status(200).json({ message: 'Logout successful' });
  });
}

export default logoutUser;
