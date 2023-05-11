import { Model, Schema, Types, model } from "mongoose";

export interface INotification {
  _id: string;
  notifName: string;
  notifTitle: string;
  notifDesc: string;
  notifNPlaceholder: string;
  notifEPlaceholder: string;
  notifButton: string;
  notifRedirect: string;
  triggerType: string;
  triggerValue: string;
  triggerDisplaySmall: boolean;
  triggerDisplayLarge: boolean;
  displayDuration: number;
  displayPosition: string;
  displayCloseButton: boolean;
  customizeTitle: string;
  customizeDesc: string;
  customizeBG: string;
  customizeButtonBG: string;
  customizeButtonText: string;
  dataSendData: boolean;
  dataWebhook: string;
  CampaignID: string;
  Tstamp: Date;
  User: string;
  Active: boolean;
}

const NotificationSchema = new Schema<INotification>({
  _id: Types.ObjectId,
  notifName: { type: String },
  notifTitle: { type: String },
  notifDesc: { type: String },
  notifNPlaceholder: { type: String },
  notifEPlaceholder: { type: String },
  notifButton: { type: String },
  notifRedirect: { type: String },
  triggerType: { type: String },
  triggerValue: { type: String },
  triggerDisplaySmall: { type: Boolean },
  triggerDisplayLarge: { type: Boolean },
  displayDuration: { type: Number },
  displayPosition: { type: String },
  displayCloseButton: { type: Boolean },
  customizeTitle: { type: String },
  customizeDesc: { type: String },
  customizeBG: { type: String },
  customizeButtonBG: { type: String },
  customizeButtonText: { type: String },
  dataSendData: { type: Boolean },
  dataWebhook: { type: String },
  CampaignID: { type: String },
  Tstamp: { type: Date, default: Date.now },
  User: { type: String },
  Active: { type: Boolean, default: true }
});

let NotifModel: Model<INotification>;

try {
    NotifModel = model<INotification>("notifications");
} catch {
    NotifModel = model<INotification>("notifications", NotificationSchema, "Notifications");
}

export default NotifModel;