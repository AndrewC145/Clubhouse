import { Request, Response } from 'express';
import { deletePost } from '../db/postQueries';

async function deletePostController(
  req: Request,
  res: Response
): Promise<void> {
  const postId = parseInt(req.params.id);

  try {
    await deletePost(postId);
    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).json({ message: 'Error deleting post' });
  }
}

export default deletePostController;
