import pool from './pool';
import { hashPassword } from '../controllers/signUpController';
import bcrypt from 'bcryptjs';

async function addUser(
  fullname: string,
  username: string,
  password: string
): Promise<void> {
  await pool.query(
    'INSERT INTO users (fullname, username, password) VALUES ($1, $2, $3)',
    [fullname, username, password]
  );
}

async function searchUser(username: string): Promise<any> {
  const { rows } = await pool.query('SELECT * FROM users WHERE username = $1', [
    username,
  ]);

  const user = rows[0];
  if (!user) {
    return false;
  } else {
    return user;
  }
}

async function compare(username: string, password: string): Promise<any> {
  const user = await searchUser(username);
  const hashedPassword = await hashPassword(password);

  if (!user) {
    return null;
  }

  return await bcrypt.compare(user.password, hashedPassword);
}

export { addUser, searchUser, compare };
