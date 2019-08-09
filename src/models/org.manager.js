import { Schema, model } from 'mongoose';
import timestamps from 'mongoose-timestamp';

const orgManagerSchema = new Schema({
  _id: Schema.Types.ObjectId,
  role: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'Users',
  },
  organization: {
    type: Schema.Types.ObjectId,
    ref: 'Organizations',
  },
});

orgManagerSchema.plugin(timestamps);

const OrgManagers = model('Oranizaion Managers', orgManagerSchema, 'Organizaion Managerss');

export default OrgManagers;
