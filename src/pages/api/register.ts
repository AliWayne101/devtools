import { NextApiRequest, NextApiResponse } from "next";
import mongoose, { connect } from "mongoose";
import userInfo from "@/schemas/userInfo";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    interface PostProps {
      email: string;
      password: string;
      name: string;
      repassword: string;
    }

    const PostData: PostProps = req.body;
    connect(process.env.NEXT_PUBLIC_MONGO_DB_ACCESS!)
      .then(() => {
        userInfo
          .find({ Email: PostData.email })
          .exec()
          .then((doc) => {
            if (doc.length === 0) {
              const newUser = new userInfo({
                _id: new mongoose.Types.ObjectId(),
                FullName: PostData.name,
                Password: PostData.password,
                Email: PostData.email
              });
              newUser.save();
              res.status(200).json({ data: true });
            } else 
              res.status(200).json({ data: doc[0] });
          })
          .catch((err) => {
            res.status(200).json({ data: err });
          });
      })
      .catch((err) => {
        res.status(400).json({ data: err });
      });
  } else {
    res.status(200).json({ data: "working"});
  }
}
