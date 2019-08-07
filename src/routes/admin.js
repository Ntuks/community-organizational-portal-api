import { admin } from '../handlers';

export default function(app) {
  // retrieve an Organization Manager
  app.get('/api/v1/admin/:admin', admin.getOne);

  // update an Organization Manager
  app.get('/api/v1/admin/:admin', admin.update);

  // delete an Organization Manager
  app.get('/api/v1/admin/activate-org-manager/:manId', admin.activate);

  // delete an Organization Manager
  app.get('/api/v1/admin/deactivate-org-manager/:manId', admin.deactivate);
}
