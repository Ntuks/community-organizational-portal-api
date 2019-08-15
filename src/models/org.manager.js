import { Schema, model } from "mongoose";
import timestamps from "mongoose-timestamp";

const orgManagerSchema = new Schema({
  _id: Schema.Types.ObjectId,
  role: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: "Users"
  },
  organization: {
    type: Schema.Types.ObjectId,
    ref: "Organizations"
  },
  events: [
    {
      type: Schema.Types.ObjectId,
      ref: "Posts"
    }
  ],
  campaigns: [
    {
      type: Schema.Types.ObjectId,
      ref: "Posts"
    }
  ],
  projects: [
    {
      type: Schema.Types.ObjectId,
      ref: "Posts"
    }
  ]
});

orgManagerSchema.plugin(timestamps);

const OrgManagers = model(
  "Organization Manager",
  orgManagerSchema,
  "Organization Managers"
);

export default OrgManagers;
