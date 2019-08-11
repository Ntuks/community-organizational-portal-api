import handlers from '../handlers';

export default function(app) {
  // retrieve all Organizations
  app.get('/api/v1/organizations', handlers.organization.getAll);

  // retrieve an Organization
  app.get('/api/v1/organizations/:orgId', handlers.organization.getOne);

  // create an Organization
  app.get('/api/v1/organizations/:orgId', handlers.organization.insert);

  // update an Organization
  app.get('/api/v1/organizations/:orgId', handlers.organization.update);

  // delete an Organization
  app.get('/api/v1/organizations/:orgId', handlers.organization.delete);
}
