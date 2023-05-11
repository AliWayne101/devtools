import campModel from "@/schemas/campaignInfo";
import Connect from "@/schemas/connect";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    if (req.query.action && req.query.target) {
      const { action, target } = req.query;
      Connect();
      if (action === "getcampaign") {
        const { userid } = req.query;
        campModel
          .find({
            selfID: target,
            User: userid
          })
          .exec()
          .then((docs) => {
            if (docs.length > 0) {
              res
                .status(200)
                .json({ exists: true, doc: docs[0], error: false });
            } else
              res.status(200).json({ exists: false, doc: null, error: false });
          })
          .catch((err) => {
            res.status(200).json({ exists: false, doc: null, error: true, details: err });
          });
      } else if (action === "getemail") {
        const { email } = req.query;
        campModel
          .find({
            selfID: target,
            Email: email
          })
          .exec()
          .then((docs) => {
            if (docs.length > 0) {
              res
                .status(200)
                .json({ exists: true, doc: docs[0], user: docs[0].User, error: false });
            } else
              res.status(200).json({ exists: false, doc: null, error: false });
          })
          .catch((err) => {
            res.status(200).json({ exists: false, doc: null, error: true, details: err });
          });
      }
    }
  }
}
