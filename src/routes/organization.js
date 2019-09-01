import handlers from '../handlers';

function api(app) {
  // retrieve all Organizations
  app.get('/api/v1/organizations', handlers.organization.getAll);

  // retrieve an Organization
  app.get('/api/v1/organization/:orgToken', handlers.organization.getOne);

  // update an Organization
  app.put('/api/v1/organization/:orgToken', handlers.organization.update);

  // delete an Organization
  // app.delete('/api/v1/organizations/:orgToken', handlers.organization.delete);
}

export default api;
