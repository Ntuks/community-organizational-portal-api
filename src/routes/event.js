import handlers from '../handlers';

export default function(app) {
  // // retrieve all posts
  // app.get("/api/v1/posts", handlers.event.getAll);

  // // retrieve a event
  // app.get("/api/v1/posts/:postId", handlers.event.getOne);

  // create a event
  app.post('/api/v1/posts', handlers.event.createEvent);

  // // update a event
  // app.get("/api/v1/posts/:postId", handlers.event.update);

  // // delete a event
  // app.get("/api/v1/posts/:postId", handlers.event.delete);
}
