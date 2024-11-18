import { JobModel } from "@/models/Job";
import mongoose from "mongoose";

export async function DELETE(req) {
  const url = new URL(req.url);
  const id = url.searchParams.get('id');

  await mongoose.connect(process.env.MONGO_URI);
  await JobModel.deleteOne({
    _id: id,
  });

  return Response.json(true);
}