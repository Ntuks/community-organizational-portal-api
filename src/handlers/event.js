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
    console.log(org);
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

    await models.User.findOneAndUpdate(
      { orgManager: { _id: org.orgManager._id } },
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

export default {
  createEvent,
};

// module.exports = {
//   Query: {
//     events: combineResolvers(isAuthenticated, async (_, args, { models, req }) => {
//       try {
//         return models.Event.find({ society: req.societyId });
//       } catch (error) {
//         throw new Error('Error Fetching Events! \n Error:', error.message);
//       }
//     }),
//     event: combineResolvers(isAuthenticated, async (_, args, { models }) => {
//       try {
//         return models.Event.findById(args.id);
//       } catch (error) {
//         throw new Error('Error Fetching Event! \n Error:', error.message);
//       }
//     }),
//   },

//   Mutation: {
//     createEvent: combineResolvers(isAuthenticated, async (_, args, { models, req }) => {
//       const event = new models.Event({
//         ...args,
//         society: req.societyId,
//       });

//       try {
//         return event.save();
//       } catch (error) {
//         throw new Error('Creation Unsuccessful', error.message);
//       }
//     }),

//     updateEvent: combineResolvers(isAuthenticated, async (_, args, { models }) => {
//       const updates = {
//         ...args,
//       };

//       delete updates.id;

//       try {
//         return models.Event.findByIdAndUpdate(
//           args.id,
//           {
//             $set: { ...updates },
//           },
//           { new: true }
//         );
//       } catch (error) {
//         throw new Error('Update Unsuccessful', error.message);
//       }
//     }),

//     deleteEvent: combineResolvers(isAuthenticated, async (_, { id }, { models }) => models.Event.findByIdAndDelete(id)),
//   },
// };
