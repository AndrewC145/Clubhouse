import pool from './pool';
import { searchUser } from './queries';

async function addPost(
  user: any,
  title: string,
  content: string,
  createdDate: Date
): Promise<void> {
  const postCreator = await searchUser(user.username);

  await pool.query(
    'INSERT INTO posts (user_id, title, content, created_time) VALUES ($1, $2, $3, $4',
    [postCreator.id, title, content, createdDate]
  );
}

async function getPosts(): Promise<any> {
  const { rows } = await pool.query('SELECT * FROM posts');
  return rows;
}

export { addPost, getPosts };
