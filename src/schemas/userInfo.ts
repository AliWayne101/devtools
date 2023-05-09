import mongoose, { Model, Schema, model } from "mongoose";

export interface IUserInfo {
  _id: mongoose.Types.ObjectId;
  Password: string;
  Email: string;
  FullName: string;
  sysID: string;
  Membership: string;
}

const Users = new Schema({
  _id: mongoose.Types.ObjectId,
  Password: String,
  Email: String,
  FullName: String,
  sysID: {
    type: String,
    Default: ''
  },
  Membership: String,
});



let UserModel: Model<IUserInfo>;

try {
  UserModel = mongoose.model<IUserInfo>("userInfo");
} catch {
  UserModel = mongoose.model<IUserInfo>("userInfo", Users, "UserInfo");
}

export default UserModel