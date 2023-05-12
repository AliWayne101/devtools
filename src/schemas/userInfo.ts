import mongoose, { Model, Schema, model } from "mongoose";

export interface IUserInfo {
  _id: mongoose.Types.ObjectId;
  Password: string;
  Email: string;
  FullName: string;
  sysID: string;
  Membership: string;
  MonthtlyImpressions: number;
}

const Users = new Schema<IUserInfo>({
  _id: mongoose.Types.ObjectId,
  Password: String,
  Email: String,
  FullName: String,
  sysID: {
    type: String,
    Default: ''
  },
  Membership: String,
  MonthtlyImpressions: {
    type: Number,
    default: 0
  }
});



let UserModel: Model<IUserInfo>;

try {
  UserModel = mongoose.model<IUserInfo>("userInfo");
} catch {
  UserModel = mongoose.model<IUserInfo>("userInfo", Users, "UserInfo");
}

export default UserModel