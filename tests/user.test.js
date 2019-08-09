/* eslint-disable no-console */
// BEHAVIOR DRIVEN TESTS
const axios = require('axios');

const url = 'http://localhost:7900/';

describe('A user', () => {
  /* ---------------  TESTING THE 'login' Handler ------------------------------*/
  test('should login with the correct credentials.', async () => {
    const response = await axios.post(url, {
      email: 'ntuthuko2@live.com',
      password: 'test',
    });

    const user = response;
    expect(user).toStrictEqual({});
  });

  test('should not login with the wrong credentials.', async () => {
    const response = await axios.post(url, {
      email: 'ntuthuko2@live.com',
      password: 'tester',
    });

    const { message } = response;
    expect(message).toStrictEqual('No User found with these login credentials.');
  });

  test('should not login if any of the fields are empty.', async () => {
    const response = await axios.post(url, {
      email: 'ntuthuko2@live.com',
      password: '',
    });

    const { error } = response;
    expect(error).toStrictEqual('No User found with these login credentials.');
  });

  /* ---------------  TESTING THE 'logout' Handler ------------------------------*/
  test('should logout after logging in', async () => {
    const response = await axios.post(url, {
      email: 'ntuthuko2@live.com',
      password: 'test',
    });

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

    const { message } = response2;
    expect(message).toStrictEqual('');
  });

  test('should not logout before logging in', async () => {
    const response = await axios.post(url, {});

    const { data } = response;
    const { errors } = data;
    const { message } = errors[0];
    expect(message).toStrictEqual('Not authenticated as a User.');
  });

  /* ---------------  TESTING THE 'resetRequest' Handler ------------------------------*/
  //   test('should request a password reset with an existing email', async () => {
  //     const response = await axios.post(url, {});

  //     const { data } = response;
  //     expect(data).toStrictEqual({});
  //   });

  //   test('should not request a password reset with non existing email', async () => {
  //     const response = await axios.post(url, {});

  //     const { data } = response;
  //     const { errors } = data;
  //     const { message } = errors[0];
  //     expect(message).toStrictEqual('No such User found for email @test.com');
  //   });

  //   /* ---------------  TESTING THE 'resetPassword' Handler ------------------------------*/
  //   test('should reset password with the right way (with the correct token)', async () => {
  //     const response = await axios.post(url, {});

  //     const { data } = response;
  //     const { signin } = data.data;
  //     const { resetToken } = signin;

  //     const response2 = await axios.post(url, {});

  //     const { resetPassword } = response2.data.data;
  //     expect(resetPassword).toStrictEqual({});
  //   });

  //   test('should not reset password with an invalid/expired token', async () => {
  //     const response = await axios.post(url, {});

  //     const { data } = response;
  //     const { errors } = data;
  //     const { message } = errors[0];
  //     expect(message).toStrictEqual('This token is either invalid or has expired.');
  //   });

  //   test('should not reset password when the passwaords do not match', async () => {
  //     const response = await axios.post(url, {});

  //     const { data } = response;
  //     const { signin } = data.data;
  //     const { resetToken } = signin;

  //     const response2 = await axios.post(url, {});

  //     const { errors } = response2.data;
  //     const { message } = errors[0];
  //     expect(message).toStrictEqual('Passwords Do Not Match');
  //   });
});
