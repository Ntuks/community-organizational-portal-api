import handlers from '../handlers';

const api = app => {
  // retrieve all Organization Managers
  app.get('/api/v1/org-managers', handlers.orgManager.getAll);

  // retrieve an Organization Manager
  app.get('/api/v1/org-managers/:manId', handlers.orgManager.getOne);

  // create an Organization Manager
  app.get('/api/v1/organizations/:orgId', handlers.orgManager.insert);

  // update an Organization Manager
  app.get('/api/v1/org-managers/:manId', handlers.orgManager.update);

  // delete an Organization Manager
  app.get('/api/v1/org-managers/:manId', handlers.orgManager.delete);
};

const auth = app => {
  // retrieve all Organization Managers
  app.post('/register', handlers.orgManager.register);
};

export default { api, auth };
