import * as status from 'http-status';
import {
  createPost,
  getPostById,
  getAllPosts,
  updatePostById,
} from './controllers/controller.post';

export const init = (app) => {

  app.get("/", (req, res) => res.json({message: "Welcome!"}));

  app.post('/post', isAuthenticated, async (req, res) => {
    const {body: post} = req;
    try {
      const newPost = await createPost(post);
      res.status(status.OK).json({
        error: 'false',
        post: newPost
      });
    } catch (e) {
      res.status(status.INTERNAL_SERVER_ERROR).json({
        error: true,
        message: 'Error while creating a new post.'
      });
    }

  });

  app.get('/post/:id', async (req, res) => {
    const {id} = req.params;
    try {
      const post = await getPostById(id);
      res.status(status.OK).json({
        error: 'false',
        post: post
      });
    } catch (e) {
      res.status(status.NOT_FOUND).json({
        error: true,
        message: 'Post not found.'
      });
    }
  });

  app.get('/post', async (req, res) => {
    try {
      const posts = await getAllPosts();
      res.status(status.OK).json({
        error: 'false',
        posts: posts
      });
    } catch (e) {
      res.status(status.NOT_FOUND).json({
        error: true,
        message: 'Post not found.'
      });
    }
  });

  app.put('/post', isAuthenticated, async (req, res) => {
    const {body: post} = req;
    try {
      const updatedPost = await updatePostById(post.id, post);
      res.status(status.OK).json({
        error: 'false',
        post: updatedPost
      });
    } catch (e) {
      res.status(status.INTERNAL_SERVER_ERROR).json({
        error: true,
        message: 'Error while updating post.'
      });
    }
  });

  function isAuthenticated(req, res, next) {
    const {token} = req.headers;
    if (token === 'sup3rS3cr3tT0k3n')
      return next();
    res.status(status.UNAUTHORIZED).json({
      result: 'Unauthenticated.'
    });
  }

}