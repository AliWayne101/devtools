import { Types, model, Model, Schema } from 'mongoose';

export interface IEmail {
    _id: Types.ObjectId;
    Email: string;
    Name: string;
    RefferingDomain: string;
    Tstamp: Date;
}

const CEmails = new Schema<IEmail>({
    _id: Types.ObjectId,
    Email: String,
    Name: String,
    RefferingDomain: String,
    Tstamp: {
        type: Date,
        default: Date.now
    },
});


let EmailModel: Model<IEmail>;

try {
    EmailModel = model<IEmail>("emails");
} catch {
    EmailModel = model<IEmail>("emails", CEmails, "Emails");
}

export default EmailModel;