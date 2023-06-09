import { NextApiRequest, NextApiResponse } from "next";
import NotifModel, { INotification } from "../../schemas/notifInfo";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const data: INotification = req.body;
    console.log(data);
    const Notification = new NotifModel({
      ...data,
    });
    Notification.save()
      .then((response) => {
        res.status(200).json({ created: true, response: response });
      })
      .catch((err) => {
        res.status(200).json(err);
      });
  } else {
    if (req.query.action && req.query.target) {
      const { action, target } = req.query;

      if (action === "getallnotifs") {
        NotifModel.find({ CampaignID: target })
          .exec()
          .then((docs) => {
            res.status(200).json({ exists: true, docs: docs });
          })
          .catch((err) => {
            res.status(200).json({ exists: false, error: err });
          });
      } else if (action === "setactivity") {
        const { newStatus } = req.query;
        const update = await NotifModel.findOneAndUpdate(
          { _id: target },
          { Active: newStatus === "true" ? true : false },
          { returnOriginal: false }
        );
        res.status(200).json({ doc: update });
      } else if (action === "deletenotif") {
        const { user } = req.query;
        const update = await NotifModel.deleteOne({
          _id: target,
          User: user,
        }).exec();
        res.status(200).json({ completed: true });
      } else if (action === "getsomenotifs") {
        NotifModel.find({ User: target })
          .sort({ Tstamp: -1 })
          .exec()
          .then((docs) => {
            res.status(200).json({ exists: true, docs: docs });
          })
          .catch((err) => {
            res.status(200).json({ exists: false, error: err });
          });
      } else if (action === "allnotifimps") {
        NotifModel.find({})
          .exec()
          .then((docs) => {
            let totalImps = 0;
            docs.map((doc) => {
              totalImps += doc.Impression;
            });
            res.status(200).json({ totalImps: totalImps });
          })
          .catch((err) => {
            res.status(200).json({ totalImps: 0 });
          });
      }
      //action statement ends above
    }
  }
}
