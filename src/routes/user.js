import handlers from '../handlers';

const auth = app => {
  // signup
  app.post('/login', handlers.user.login);

  // request password reset
  app.post('/reset-request', handlers.user.resetRequest);

  // reset password
  app.post('/reset-password', handlers.user.resetPassword);
};

const api = app => {
  // logout
  app.get('/logout', handlers.user.logout);
};

export default { api, auth };
