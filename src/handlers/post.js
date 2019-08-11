// const { combineResolvers } = require('graphql-resolvers');
// const isAuthenticated = require('../middlewares/authorization');

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
