import { addUser } from '../db/queries';
import { Request, Response } from 'express';

async function signUpUser(req: Request, res: Response) {
  const { fullname, username, password, confirmPassword } = req.body;
}

export { signUpUser };
