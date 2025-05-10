import pool from './pool';
import { hashPassword } from '../controllers/signUpController';

async function addUser(fullname: string, username: string, password: string) {
  await pool.query(
    'INSERT INTO users (fullname, username, password) VALUES ($1, $2, $3)',
    [fullname, username, password]
  );
}

async function searchUser(username: string) {
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

async function compare(username: string, password: string) {
  const hashedPassword = hashPassword(password);
  const user = searchUser(username);

  if (!user) {
    return false;
  }
}

export { addUser, searchUser };
