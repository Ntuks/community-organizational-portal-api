import { user } from '../handlers';

const auth = app => {
  // signup
  app.post('/register', user.register);

  // request password reset
  app.post('/reset-request', user.resetRequest);

  // reset password
  app.post('/reset-password', user.resetPassword);
};

const api = app => {
  // logout
  app.get('/logout', user.logout);
};

export default { api, auth };
