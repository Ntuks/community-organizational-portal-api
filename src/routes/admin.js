import handlers from '../handlers';

export default function(app) {
  // retrieve an Organization Manager
  // app.get('/api/v1/admin', handlers.admin.getOne);

  // // update an Organization Manager
  // app.put('/api/v1/admin', handlers.admin.update);

  // activate an Organization
  app.put('/api/v1/admin/activate-org', handlers.admin.activateOrganization);

  // deactivate an Organization
  app.put('/api/v1/admin/deactivate-org', handlers.admin.deactivateOrganization);
}
