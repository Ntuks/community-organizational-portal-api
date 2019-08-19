import handlers from '../handlers';

export default function(app) {
  // retrieve all projects
  app.get('/api/v1/projects', handlers.project.getAllProjects);

  // retrieve a project
  app.get('/api/v1/projects/:projectId', handlers.project.getProject);

  // create a project
  app.post('/api/v1/projects', handlers.project.createProject);

  // update a project
  app.put('/api/v1/projects/:projectId', handlers.project.updateProject);

  // delete a project
  app.delete('/api/v1/projects/:projectId', handlers.project.deleteProject);
}
