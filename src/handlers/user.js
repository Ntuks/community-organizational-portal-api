import { hash } from 'bcryptjs';
import { randomBytes } from 'crypto';
import { promisify } from 'util';
import models from '../models/index';
// import { sendMail } from '../utils/mail.js';

const setCookie = function(res, token) {
  res.cookie('token', token, {
    // Javascript shouldn't be able to access the cookie
    httpOnly: true,
    // One year cookie
    maxAge: 1000 * 60 * 24 * 7,
  });
};

const login = async (req, res) => {
  const inputEmail = req.body.email.toLowerCase();
  if (inputEmail === '' || req.body.password === '') {
    res.send({ message: 'Please fill in all the fields.' });
    return;
  }

  try {
    // check if there is a user with that email
    const validationUser = await models.User.findOne({ email: inputEmail })
      .populate({
        path: 'orgManager',
        select: 'role organization',
      })
      .select('-__v');

    if (!validationUser) {
      res.send({ message: 'No user found with these login credentials.' });
      return;
    }

    // check if the user's password is correct
    const isValid = await validationUser.validatePassword(req.body.password);
    if (!isValid) {
      res.send({ message: 'Your signin details are incorrect.' });
      return;
    }
    // create the jwt - for the current session
    const token = await validationUser.generateToken(validationUser.orgManager.organization);
    // set the jwt as a cookie on the response
    setCookie(res, token);

    const { _id, name, surname, email, role, orgManager, resetToken, resetTokenExpiry } = validationUser;

    // check if the user is admin or orgManager
    if (orgManager) {
      // the user object without the password
      const user = {
        _id,
        name,
        surname,
        email,
        role,
        orgManager,
        resetToken,
        resetTokenExpiry,
      };

      // return the user
      res.send(user);
    } else {
      // the user object without the password
      const user = {
        _id,
        name,
        surname,
        email,
        role,
        resetToken,
        resetTokenExpiry,
      };

      // return the user
      res.send(user);
    }
  } catch (error) {
    res.send({ message: error.message });
  }
};

const logout = async (req, res) => {
  res.clearCookie('token');
  res.send({ message: 'Logged out successfuly!' });
};

const resetRequest = async (req, res) => {
  const email = req.body.email.toLowerCase();
  if (email === '') {
    res.send({ message: 'Please fill in all the fields.' });
    return;
  }

  try {
    // check if there is a user with that email
    const user = await models.User.findOne({ email }).select('-password -__v');
    if (!user) {
      res.send({ message: `No user was found for the email ${email}.` });
      return;
    }

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
    // const subject = 'Reset Password Request';
    // const emailData = {
    //   name: user.name,
    //   title: 'Password reset',
    //   description: 'You have requested a password reset, please follow the link below to reset your password.',
    //   link: 'NEED ONE', // TODO: put the reset page link here.
    //   buttonText: 'Follow this link to reset your password.',
    // };
    // await sendMail(user.email, subject, emailData);

    res.send({ message: 'Reset Request Sent Successfully!' });
  } catch (error) {
    res.send({ message: error.message.substring(error.message.lastIndexOf(':') + 2) });
  }
};

const resetPassword = async (req, res) => {
  if (req.body.password === '' || req.body.confirmPassword === '') {
    res.send({ message: 'Please fill in all the fields.' });
    return;
  }

  // check if the passwords match
  if (req.body.password !== req.body.confirmPassword) {
    res.send({ message: 'Passwords Do Not Match' });
    return;
  }

  try {
    // check if the token is belongs to a user in the db
    const user = await models.User.findOne({ resetToken: req.body.resetToken });
    if (!user) {
      res.send({ message: 'This token is invalid.' });
      return;
    }

    // and check if the token has expired
    if (!(user.resetTokenExpiry > Date.now() - 3600000)) {
      res.send({ message: 'This token has expired.' });
      return;
    }
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
    )
      .populate({
        path: 'orgManager',
        select: 'role',
      })
      .select('-password -__v');

    // create the jwt
    const token = await updatedUser.generateToken(); // TODO: Check this - causing an error
    // set the jwt as a cookie on in the response
    setCookie(res, token);

    // return the new user
    res.send({ message: 'Password Reset Successfully!' });
  } catch (error) {
    res.send({ message: error.message.substring(error.message.lastIndexOf(':') + 2) });
  }
};

export default {
  login,
  logout,
  resetRequest,
  resetPassword,
};
