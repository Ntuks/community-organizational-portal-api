import { post } from '../handlers';

export default function(app) {
  // retrieve all posts
  app.get('/api/v1/posts', post.getAll);

  // retrieve a post
  app.get('/api/v1/posts/:postId', post.getOne);

  // create a post
  app.get('/api/v1/posts/:postId', post.insert);

  // update a post
  app.get('/api/v1/posts/:postId', post.update);

  // delete a post
  app.get('/api/v1/posts/:postId', post.delete);
}
