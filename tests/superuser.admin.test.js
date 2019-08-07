/* eslint-disable no-console */
// BEHAVIOR DRIVEN TESTS
const axios = require('axios');

const url = 'http://localhost:7900/society';

describe('A user', () => {
  /* ---------------  TESTING THE 'signin' RESOLVER ------------------------------*/
  test('should signin with the correct credentials.', async () => {
    const response = await axios.post(url, {});

    const { data } = response;
    expect(data).toStrictEqual({});
  });

  test('should not signin with the wrong credentials.', async () => {
    const response = await axios.post(url, {});

    const { data } = response;
    const { errors } = data;
    const { message } = errors[0];
    expect(message).toStrictEqual('No society found with these login credentials.');
  });

  test('should not signin if any of the fields are empty.', async () => {
    const response = await axios.post(url, {});

    const { data } = response;
    const { errors } = data;
    const { message } = errors[0];
    expect(message).toStrictEqual('No society found with these login credentials.');
  });

  /* ---------------  TESTING THE 'signout' RESOLVER ------------------------------*/
  test('should signout after signing in', async () => {
    const response = await axios.post(url, {});

    const { headers } = response;
    const setcookie = headers['set-cookie'];
    const cookieString = setcookie[0];
    const token = cookieString.slice(0, cookieString.indexOf(';'));

    const instance = await axios.create({
      baseURL: url,
      timeout: 3000,
      headers: {
        cookie: token,
      },
    });

    const response2 = await instance.post(url, {});

    const { data } = response2;
    expect(data).toStrictEqual({
      data: {
        signout: {
          message: 'Logged out Successfully!',
        },
      },
    });
  });

  test('should not signout before signing in', async () => {
    const response = await axios.post(url, {});

    const { data } = response;
    const { errors } = data;
    const { message } = errors[0];
    expect(message).toStrictEqual('Not authenticated as a society.');
  });

  /* ---------------  TESTING THE 'resetRequest' RESOLVER ------------------------------*/
  test('should request a password reset with an existing email', async () => {
    const response = await axios.post(url, {});

    const { data } = response;
    expect(data).toStrictEqual({});
  });

  test('should not request a password reset with non existing email', async () => {
    const response = await axios.post(url, {});

    const { data } = response;
    const { errors } = data;
    const { message } = errors[0];
    expect(message).toStrictEqual('No such society found for email @test.com');
  });

  /* ---------------  TESTING THE 'resetPassword' RESOLVER ------------------------------*/
  test('should reset password with the right way (with the correct token)', async () => {
    const response = await axios.post(url, {});

    const { data } = response;
    const { signin } = data.data;
    const { resetToken } = signin;

    const response2 = await axios.post(url, {});

    const { resetPassword } = response2.data.data;
    expect(resetPassword).toStrictEqual({});
  });

  test('should not reset password with an invalid/expired token', async () => {
    const response = await axios.post(url, {});

    const { data } = response;
    const { errors } = data;
    const { message } = errors[0];
    expect(message).toStrictEqual('This token is either invalid or has expired.');
  });

  test('should not reset password when the passwaords do not match', async () => {
    const response = await axios.post(url, {});

    const { data } = response;
    const { signin } = data.data;
    const { resetToken } = signin;

    const response2 = await axios.post(url, {});

    const { errors } = response2.data;
    const { message } = errors[0];
    expect(message).toStrictEqual('Passwords Do Not Match');
  });

  /* ---------------  TESTING THE 'updateProfile' RESOLVER ------------------------------*/
  test('should activate an organization manager profile only when signed in', async () => {
    const response = await axios.post(url, {});

    const { headers } = response;
    const setcookie = headers['set-cookie'];
    const cookieString = setcookie[0];
    const token = cookieString.slice(0, cookieString.indexOf(';'));

    const instance = await axios.create({
      baseURL: url,
      timeout: 3000,
      headers: {
        cookie: token,
      },
    });

    const response2 = await instance.post(url, {});

    const { data } = response2;
    expect(data).toStrictEqual({});
  });

  test('should deactivate an organization manager profile only when signed in', async () => {
    const response = await axios.post(url, {});

    const { headers } = response;
    const setcookie = headers['set-cookie'];
    const cookieString = setcookie[0];
    const token = cookieString.slice(0, cookieString.indexOf(';'));

    const instance = await axios.create({
      baseURL: url,
      timeout: 3000,
      headers: {
        cookie: token,
      },
    });

    const response2 = await instance.post(url, {});

    const { data } = response2;
    expect(data).toStrictEqual({});
  });

  test('should not activate an organization manager profile if not signed in', async () => {
    const response = await axios.post(url, {});

    const { data } = response;
    const { errors } = data;
    const { message } = errors[0];
    expect(message).toStrictEqual('Not authenticated as a society.');
  });

  test('should not de activate an organization manager profile if not signed in', async () => {
    const response = await axios.post(url, {});

    const { data } = response;
    const { errors } = data;
    const { message } = errors[0];
    expect(message).toStrictEqual('Not authenticated as a society.');
  });
});
