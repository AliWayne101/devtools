import { generateID } from "@/Details";
import campModel from "@/schemas/campaignInfo";
import Connect from "@/schemas/connect";
import mongoose from "mongoose";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.query.action && req.query.target) {
    Connect();
    const { action, target } = req.query;
    if (action === "allcampaigns") {
      campModel
        .find({ User: target })
        .exec()
        .then((docs) => {
          res.status(200).json({ found: true, docs: docs });
        })
        .catch((err) => {
          res.status(200).json({ found: false, error: err });
        });
    } else if (action === "changestatus") {
      let nState = req.query.nstate === "true" ? true : false;
      campModel
        .findOneAndUpdate(
          { _id: JSON.parse(target + "") },
          { isActive: nState },
          { returnOriginal: false }
        )
        .then((doc) => {
          res.status(200).json({ found: true, docs: doc });
        })
        .catch((err) => {
          res.status(200).json({ found: false, error: err });
        });
    } else if (action === "addcampaign") {
      let { campname, user, email } = req.query;
      campModel
        .create({
          _id: new mongoose.Types.ObjectId(),
          isActive: true,
          Name: campname,
          URL: target,
          User: user,
          selfID: generateID(10),
          Email: email,
        })
        .then((doc) => {
          res.status(200).json({ created: true });
        })
        .catch((err) => {
          res.status(200).json({ created: false });
        });
    } else if (action === "getemail") {
      campModel
        .find({ selfID: target })
        .exec()
        .then((docs) => {
          if (docs.length > 0) {
            res
              .status(200)
              .json({ exists: true, email: docs[0].Email, doc: docs[0] });
          } else
            res.status(200).json({ exists: false, email: null, doc: null });
        })
        .catch((err) => {
          res.status(200).json({ exists: false, email: null, error: err });
        });
    }
  }
}
