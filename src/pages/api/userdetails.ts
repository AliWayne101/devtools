import Connect from "@/schemas/connect";
import UserModel from "@/schemas/userInfo";
import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";

const generateID = () => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const length = 32;
  let result = "";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    Connect();
    const nSysID = generateID();
    const { Email, FullName } = req.body;
    UserModel.create({
      _id: new mongoose.Types.ObjectId(),
      Email: Email,
      FullName: FullName,
      Password: "null",
      sysID: nSysID,
      Membership: "Free",
    })
      .then((user) => {
        res.status(200).json({ confirmed: true, sysID: nSysID, exists: true, membership: "Free" });
      })
      .catch((err) => {
        res.status(200).json({
          confirmed: false,
          sysID: "error",
          exists: false,
          error: err,
        });
      });
  } else {
    if (req.query.action && req.query.target) {
      Connect();
      const { action, _target } = req.query;
      const target = decodeURIComponent(_target+"");
      if (action === "generateID") {
        UserModel.find({ Email: target })
          .exec()
          .then((docs) => {
            if (docs.length > 0) {
              if (docs[0].sysID.length < 2) {
                const nSysID = generateID();
                UserModel.findOneAndUpdate(
                  { Email: target },
                  { sysID: nSysID },
                  { returnOriginal: false }
                )
                  .then((updated) => {
                    res
                      .status(200)
                      .json({ confirmed: true, sysID: nSysID, exists: true, membership: updated ? updated.Membership : "Free"});
                  })
                  .catch((err) => {
                    res.status(200).json({
                      confirmed: false,
                      sysID: "error",
                      exists: false,
                      error: err,
                    });
                  });
              } else {
                res.status(200).json({
                  confirmed: true,
                  sysID: docs[0].sysID,
                  already: true,
                  exists: true,
                  membership: docs[0].Membership
                });
              }
            } else {
              res.status(200).json({
                confirmed: false,
                sysID: "null",
                already: false,
                exists: false,
              });
            }
          })
          .catch((err) => {
            res.status(400).json({ error: err });
          });
          //End of statement
      }
    }
  }
}
