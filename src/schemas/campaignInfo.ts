import { Document, Model, Schema, model, Types } from "mongoose";

export interface ICampaigns {
  _id: Types.ObjectId;
  Name: string;
  URL: string;
  Tstamp: Date;
  User: string;
  isActive: boolean;
  selfID: string;
  Email: string;
}

const Campaigns = new Schema({
  _id: Types.ObjectId,
  Name: String,
  URL: String,
  Tstamp: {
    type: Date,
    default: Date.now,
  },
  User: String,
  isActive: Boolean,
  selfID: String,
  Email: String,
});

let campModel: Model<ICampaigns>;

try {
  campModel = model<ICampaigns>("campaigns");
} catch {
  campModel = model<ICampaigns>("campaigns", Campaigns, "Campaigns");
}

export default campModel;
