import campModel from "@/schemas/campaignInfo";
import EmailModel from "@/schemas/collectedEmail";
import NotifModel from "@/schemas/notifInfo";
import axios from "axios";
import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,OPTIONS,PATCH,DELETE,POST,PUT"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    // Handle CORS pre-flight request
    res.status(200).end();
    return;
  }

  // Handle POST request
  if (req.method === "POST") {
    if (req.headers.referer) {
      const targetAddr = req.headers.referer;
      const plainAddr = targetAddr.split("/")[2];

      if (req.body.name && req.body.email) {
        const { name, email } = req.body;

        const emailRes = await EmailModel.find({ Email: email }).exec();
        if (email.length > 0) {
          res.status(200).json({ registered: true });
          return;
        }

        const response = await campModel.find({ URL: plainAddr }).exec();
        if (response.length > 0) {
          if (response[0].isActive === true) {
            NotifModel.find({ CampaignID: response[0].selfID })
              .exec()
              .then((response) => {
                EmailModel.create({
                  _id: new mongoose.Types.ObjectId(),
                  Name: name,
                  Email: email,
                  RefferingDomain: plainAddr,
                })
                  .then(() => console.log("an Email was registered"))
                  .catch((err) => console.log);
                if (response.length > 0) {
                  if (response[0].dataSendData) {
                    axios
                      .post(response[0].dataWebhook, {
                        Name: name,
                        Email: email,
                        RefDomain: targetAddr,
                      })
                      .then((e) => {
                        console.log("Success");
                        res.status(200).json({ registered: true });
                      })
                      .catch((e) => console.log(e));
                  } else {
                    res.status(200).json({ registered: true });
                  }
                }
              })
              .catch((err) => {
                console.log(err);
                res.status(403).json({ system: "malfunction " });
              });
          } else {
            res.status(200).json("Invalid Action");
          }
        } else {
          res.status(200).json("Invalid Action");
        }
      }
    }
    res.status(200).json({ message: "Post request received." });
    return;
  }

  // Handle other request methods
  res.status(405).end();
}
