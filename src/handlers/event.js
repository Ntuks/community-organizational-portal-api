import { verify } from 'jsonwebtoken';
import { Types } from 'mongoose';
import models from '../models/index';

const createEvent = async (req, res) => {
  try {
    // check if the token of the user allows them to create a event.
    const { user } = req;
    const org = await models.Organization.findOne({ orgManager: { _id: user.orgManager._id } }).select(
      '_id status orgManager'
    );
    if (!org.status) {
      res.send({
        message: 'Not allowed to event. Account not yet activated.',
      });
      return;
    }

    // check if the user is trying to edit fields they are not supposed to.
    const args = req.body;
    if (args.orgManager != null || args.organization != null) {
      res.send({
        message: 'Not allowed to edit organization manager and organization.',
      });
      return;
    }

    const { title, description, location, time, date, poster } = args;

    // check if this event already exists
    let event = await models.Event.findOne({ title }).select('-__v');
    if (event) {
      res.send({ message: 'Event already exists.' });
      return;
    }

    // create and save new event
    event = new models.Event({
      _id: Types.ObjectId(),
      title,
      description,
      location,
      time,
      date,
      poster,
      organization: org._id,
      orgManager: org.orgManager._id,
    });
    try {
      await event.save();
      res.send(event);
    } catch (error) {
      res.send({
        message: error.message.substring(error.message.lastIndexOf(':') + 2),
      });
      return;
    }

    await models.OrgManager.findOneAndUpdate(
      { _id: { _id: org.orgManager._id } },
      {
        $push: {
          events: event,
        },
      },
      { new: true }
    );

    await models.Organization.findOneAndUpdate(
      { _id: org._id },
      {
        $push: {
          events: event,
        },
      },
      { new: true }
    );
  } catch (error) {
    res.send({ message: error.message });
  }
};

const getEvent = async (req, res) => {
  try {
    // check if the token of the user allows them to create a event.
    const { user } = req;
    const org = await models.Organization.findOne({ orgManager: { _id: user.orgManager._id } }).select(
      '_id status orgManager'
    );
    if (!org.status) {
      res.send({
        message: 'Not allowed to event. Account not yet activated.',
      });
      return;
    }

    const { eventId } = req.params;
    const event = await models.Event.findOne({ _id: eventId }).select('-__v');

    res.send(event);
  } catch (error) {
    res.send({ message: error.message });
  }
};

const getAllEvents = async (req, res) => {
  try {
    // check if the token of the user allows them to create a event.
    const { user } = req;
    const org = await models.Organization.findOne({ orgManager: { _id: user.orgManager._id } }).select(
      '_id status orgManager'
    );
    if (!org.status) {
      res.send({
        message: 'Not allowed to event. Account not yet activated.',
      });
      return;
    }

    // check if this event already exists
    const events = await models.Event.find().select('-__v');
    res.send(events);
  } catch (error) {
    res.send({ message: error.message });
  }
};

const updateEvent = async (req, res) => {
  try {
    // check if the token of the user allows them to create a event.
    const { user } = req;
    const org = await models.Organization.findOne({ orgManager: { _id: user.orgManager._id } }).select(
      '_id status orgManager'
    );
    if (!org.status) {
      res.send({
        message: 'Not allowed to event. Account not yet activated.',
      });
      return;
    }

    // check if the user is trying to edit fields they are not supposed to.
    const args = req.body;
    if (args.orgManager != null || args.organization != null) {
      res.send({
        message: 'Not allowed to edit organization manager and organization.',
      });
      return;
    }

    const event = await models.Event.findOneAndUpdate(
      { _id: args._id },
      {
        $set: { ...args },
      },
      { new: true }
    );

    res.send(event);
  } catch (error) {
    res.send({ message: error.message });
  }
};

const deleteEvent = async (req, res) => {
  try {
    // check if the token of the user allows them to create a event.
    const { user } = req;
    const org = await models.Organization.findOne({ orgManager: { _id: user.orgManager._id } }).select(
      '_id status orgManager'
    );
    if (!org) {
      res.send({
        message: 'Not allowed to delete the event.',
      });
      return;
    }

    // check if the user is trying to edit fields they are not supposed to.
    const args = req.body;
    if (args.orgManager != null || args.organization != null) {
      res.send({
        message: 'Not allowed to edit organization manager and organization.',
      });
      return;
    }
    const { eventId } = req.params;
    const event = await models.Event.findByIdAndRemove({ _id: eventId });
    res.send({
      message: 'Event deleted successfully.',
    });

    // this functionality has not been tested yet
    await models.OrgManager.findOneAndUpdate(
      { _id: { _id: org.orgManager._id } },
      {
        $pop: {
          events: event,
        },
      },
      { new: true }
    );

    await models.Organization.findOneAndUpdate(
      { _id: org._id },
      {
        $pop: {
          events: event,
        },
      },
      { new: true }
    );
  } catch (error) {
    res.send({ message: error.message });
  }
};

export default {
  createEvent,
  getEvent,
  getAllEvents,
  updateEvent,
  deleteEvent,
};
