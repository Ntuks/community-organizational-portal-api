import { hash } from 'bcryptjs';
import { randomBytes } from 'crypto';
import { promisify } from 'util';
import models from '../models/index';
import { sendMail } from '../utils/mail.js';

const setCookie = function(res, token) {
  res.cookie('token', token, {
    // Javascript shouldn't be able to access the cookie
    httpOnly: true,
    // One year cookie
    maxAge: 1000 * 60 * 24 * 7,
  });
};

const login = async (req, res) => {
  const email = req.body.email.toLowerCase();
  if (email === '' || req.body.password === '') throw new Error('Please fill in all the fields.');

  try {
    // check if there is a user with that email
    const user = await models.User.findOne({ email }).populate({
      path: 'user',
      select: 'name surname email resetToken resetTokenExpiry',
    });
    if (!user) throw new Error('No user found with these login credentials.');

    // check if the user's password is correct
    const isValid = await user.validatePassword(req.body.password);
    if (!isValid) throw new Error('Your signin details are incorrect.');

    // create the jwt - for the current session
    const token = await user.generateToken();
    // set the jwt as a cookie on the response
    setCookie(res, token);

    // return the user
    res.send(user);
  } catch (error) {
    throw new Error(error.message);
  }
};

const logout = async (req, res) => {
  res.clearCookie('token');
  res.send({ message: 'Logged out successfuly!' });
};

const resetRequest = async (req, res) => {
  const email = req.body.email.toLowerCase();
  if (email === '') throw new Error('Please fill in all the fields.');

  try {
    // check if there is a user with that email
    const user = await models.User.findOne({ email }).populate({
      path: 'user',
      select: 'email',
    });
    if (!user) throw new Error(`No user was found for the email ${email}.`);

    // set a reset token and its lifespan on that user
    const randomBytesPromsified = promisify(randomBytes);
    const resetToken = (await randomBytesPromsified(20)).toString('hex');
    const resetTokenExpiry = Date.now() + 3600000; // one hour from now
    await models.User.findOneAndUpdate(
      { email },
      {
        $set: {
          resetToken,
          resetTokenExpiry,
        },
      },
      { new: true }
    );

    // send email to the given email address
    const subject = 'Reset Password Request';
    const emailData = {
      name: user.firstName,
      title: 'Password reset',
      description: 'You have requested a password reset, please follow the link below to reset your password.',
      link: 'NEED ONE', // TODO: put the reset page link here.
      buttonText: 'Follow this link to reset your password.',
    };
    await sendMail(user.email, subject, emailData);
  } catch (error) {
    throw new Error(error.message);
  }

  res.send({ message: 'Reset Request Sent Successfully!' });
};

const resetPassword = async (req, res) => {
  if (req.body.password === '' || req.body.confirmPassword === '') {
    throw new Error('Please fill in all the fields.');
  }

  // check if the passwords match
  if (req.body.password !== req.body.confirmPassword) throw new Error('Passwords Do Not Match');

  try {
    // check if the token is legit
    const user = await models.User.findOne({ resetToken: req.body.resetToken });
    if (!user) throw new Error('This token is invalid.');

    // and check if the token has expired
    if (!(user.resetTokenExpiry > Date.now() - 3600000)) throw new Error('This token has expired.');

    // hash the new password
    const newPassword = await hash(req.body.password, 10);
    // save the new password to the user and remove the old reset token fields
    const updatedUser = await models.User.findOneAndUpdate(
      { email: user.email },
      {
        $set: {
          password: newPassword,
          resetToken: null,
          resetTokenExpiry: null,
        },
      },
      { new: true }
    );

    // create the jwt
    const token = await updatedUser.generateToken(); // TODO: Check this - causing an error
    // set the jwt as a cookie on in the response
    setCookie(res, token);

    // return the new user
    res.send(updatedUser);
  } catch (error) {
    throw new Error(error.message);
  }
};

export default {
  login,
  logout,
  resetRequest,
  resetPassword,
};
