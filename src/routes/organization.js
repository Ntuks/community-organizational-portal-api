import { organization } from '../handlers';

export default function(app) {
  // retrieve all Organizations
  app.get('/api/v1/organizations', organization.getAll);

  // retrieve an Organization
  app.get('/api/v1/organizations/:orgId', organization.getOne);

  // create an Organization
  app.get('/api/v1/organizations/:orgId', organization.insert);

  // update an Organization
  app.get('/api/v1/organizations/:orgId', organization.update);

  // delete an Organization
  app.get('/api/v1/organizations/:orgId', organization.delete);
}
