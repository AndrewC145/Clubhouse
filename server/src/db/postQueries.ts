import pool from './pool';

async function addPost(
  author: string,
  title: string,
  content: string,
  created_time: string
): Promise<void> {
  await pool.query(
    'INSERT INTO posts (author, title, content, created_date) VALUES ($1, $2, $3, $4)',
    [author, title, content, created_time]
  );
}

async function getPosts(): Promise<any> {
  const { rows } = await pool.query('SELECT * FROM posts');
  return rows;
}

async function deletePost(id: number): Promise<void> {
  await pool.query('DELETE FROM posts WHERE id = $1', [id]);
}

export { addPost, getPosts, deletePost };
