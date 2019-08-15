import handlers from '../handlers';

export default function(app) {
  // retrieve all posts
  app.get('/api/v1/events', handlers.event.getAllEvents);

  // retrieve a event
  app.get('/api/v1/events/:eventId', handlers.event.getEvent);

  // create a event
  app.post('/api/v1/events', handlers.event.createEvent);

  // update a event
  app.get('/api/v1/posts/:postId', handlers.event.updateEvent);

  // delete a event
  app.get('/api/v1/posts/:postId', handlers.event.deleteEvent);
}
