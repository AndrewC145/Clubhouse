import pool from './pool';

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

  let user = rows[0];
}

export { addUser };
