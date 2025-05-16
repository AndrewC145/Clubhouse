import pool from './pool';

async function addPost(
  user: number,
  title: string,
  content: string,
  createdDate: Date
): Promise<void> {
  await pool.query(
    'INSERT INTO posts (user_id, title, content, created_time) VALUES ($1, $2, $3, $4)',
    [user, title, content, createdDate]
  );
}

async function getPosts(): Promise<any> {
  const { rows } = await pool.query('SELECT * FROM posts');
  return rows;
}

export { addPost, getPosts };
