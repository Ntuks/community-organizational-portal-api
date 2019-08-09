/* eslint-disable no-console */
// BEHAVIOR DRIVEN TESTS
const axios = require('axios');

const url = 'http://localhost:7900';

describe('An Organization Manager', () => {
  /* --------------- TESTING THE 'register' Handler ------------------------------*/
  test('should register with new credentials.', async () => {
    console.log('Test 1');
    const response = await axios.post(`${url}/register`, {
      name: 'Ntuthuko',
      surname: 'Mpaku',
      email: 'ntuthuko2@live.com',
      password: 'test',
    });

    const { message } = response;
    expect(message).toStrictEqual('Signup Successful!');
  });

  test('should not register with existing user credentials.', async () => {
    console.log('Test 2');
    const response = await axios.post(`${url}/register`, {
      name: 'Ntuthuko',
      surname: 'Mpaku',
      email: 'ntuthuko2@live.com',
      password: 'test',
    });

    const { message } = response;
    expect(message).toStrictEqual('User with these credentials already exists.');
  });

  test('should not register if email is invalid.', async () => {
    console.log('Test 3');
    const response = await axios.post(`${url}/register`, {
      name: 'Ntuthuko',
      surname: 'Mpaku',
      email: 'ntuthuko',
      password: 'test',
    });

    const { message } = response;
    expect(message).toStrictEqual('User with these credentials already exists.');
  });

  test('should not register if any of the fields are empty.', async () => {
    console.log('Test 4');
    const response = await axios.post(`${url}/register`, {
      name: 'Ntuthuko',
      surname: 'Mpaku',
      email: 'ntuthuko2@live.com',
      password: '',
    });

    const { message } = response;
    expect(message).toStrictEqual('Please fill in all the fields.');
  });

  // /* ---------------  TESTING THE 'updateProfile' Handler ------------------------------*/
  // test('should update the profile only when signed in', async () => {
  //   const response = await axios.post(url, {
  //     name: 'Ntuthuko',
  //     surname: 'Mpaku',
  //     email: 'ntuthuko2@live.com',
  //     password: 'test',
  //   });

  //   const { headers } = response;
  //   const setcookie = headers['set-cookie'];
  //   const cookieString = setcookie[0];
  //   const token = cookieString.slice(0, cookieString.indexOf(';'));

  //   const instance = await axios.create({
  //     baseURL: url,
  //     timeout: 3000,
  //     headers: {
  //       cookie: token,
  //     },
  //   });

  //   const response2 = await instance.post(url, {});

  //   const data = response2;
  //   expect(data).toStrictEqual({});
  // });

  // test('should not update the profile if not signed in', async () => {
  //   const response = await axios.post(url, {});

  //   const { message } = response;
  //   expect(message).toStrictEqual('Not authenticated as a user.');
  // });
});
