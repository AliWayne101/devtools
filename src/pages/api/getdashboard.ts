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
    if (action === "latestcampaigns") {
      
    }
  }
}
