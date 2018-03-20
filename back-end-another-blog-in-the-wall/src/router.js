import * as status  from 'http-status';
import {createPost} from './controllers/controller.post';

export const init = (app) => {

  app.get("/", (req, res) => res.json({message: "Welcome!"}));

  app.post('/post', isAuthenticated, async (req, res, next) => {
    try {
      await createPost(req);
      res.status(status.OK).json({
        result: 'Post created'
      });
    } catch (e) {
      res.status(status.INTERNAL_SERVER_ERROR).json({
        result: 'Error while creating a new post.'
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