import mongoose, { Model, Schema, model } from "mongoose";

export interface ICampaigns {
  _id: mongoose.Types.ObjectId;
  Name: string;
  URL: string;
  Tstamp: Date;
  User: String;
}

const Campaigns = new Schema({
  _id: mongoose.Types.ObjectId,
  Name: String,
  URL: String,
  Tstamp: {
    type: Date,
    default: Date.now,
  },
  User: String,
});

let campModel: Model<ICampaigns>;

try {
  campModel = model<ICampaigns>("campaigns");
} catch {
  campModel = model<ICampaigns>("campaigns", Campaigns, "Campaigns");
}

export default campModel;
