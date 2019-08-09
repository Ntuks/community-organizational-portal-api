import { Types } from 'mongoose';
import models from '../models/index';

const register = async (req, res) => {
  const email = req.body.email.toLowerCase();
  if (email === '' || req.body.name === '' || req.body.surname === '' || req.body.password === '') {
    res.send({ message: 'Please fill in all the fields.' });
    return;
  }

  try {
    const usr = await models.User.findOne({ email });
    if (usr) {
      res.send({ message: 'A user with these credentials already exists.' });
      return;
    }
  } catch (error) {
    throw new Error(error.message);
  }

  const user = new models.User({
    _id: Types.ObjectId(),
    name: req.body.name,
    surname: req.body.surname,
    email,
    password: req.body.password,
  });

  const orgManager = new models.OrgManager({
    _id: Types.ObjectId(),
    role: 'Organization Manager',
    user: user._id,
  });

  const organization = new models.Organization({
    _id: Types.ObjectId(),
    orgManager: orgManager._id,
  });

  // linking models for the appropriate relationship
  user.orgManager = orgManager._id;
  orgManager.user = user._id;
  orgManager.organization = organization._id;
  organization.orgManager = orgManager._id;

  try {
    await user.save();
  } catch (error) {
    res.send({ message: error.message.substring(error.message.lastIndexOf(':') + 2) });
    return;
  }

  try {
    await orgManager.save();
  } catch (error) {
    throw new Error(error.message);
  }

  try {
    await organization.save();
  } catch (error) {
    throw new Error(error.message);
  }

  res.send({ message: 'Signup Successful!' });
};

export default {
  register,
};
