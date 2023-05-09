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
      let { campname, _sysID } = req.query;
      campModel
        .create({
          _id: new mongoose.Types.ObjectId(),
          isActive: true,
          Name: campname,
          URL: target,
          User: _sysID,
        })
        .then((doc) => {
          res.status(200).json({ created: true });
        })
        .catch((err) => {
          res.status(200).json({ created: false });
        });
    }
  }
}
