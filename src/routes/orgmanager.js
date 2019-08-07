import { orgManager } from '../handlers';

const api = app => {
  // retrieve all Organization Managers
  app.get('/api/v1/org-managers', orgManager.getAll);

  // retrieve an Organization Manager
  app.get('/api/v1/org-managers/:manId', orgManager.getOne);

  // create an Organization Manager
  app.get('/api/v1/organizations/:orgId', orgManager.insert);

  // update an Organization Manager
  app.get('/api/v1/org-managers/:manId', orgManager.update);

  // delete an Organization Manager
  app.get('/api/v1/org-managers/:manId', orgManager.delete);
};

const auth = app => {
  // retrieve all Organization Managers
  app.get('/signup', orgManager.getAll);
};

export default { api, auth };
