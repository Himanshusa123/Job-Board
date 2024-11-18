'use server';

import { JobModel } from "@/models/Job";
import mongoose from "mongoose";
import { revalidatePath } from "next/cache";

export async function saveJobAction(formData) {
  await mongoose.connect(process.env.MONGO_URI);
  const { id, ...jobData } = Object.fromEntries(formData);
  
  // Find by ID and update or create a new job document
  const jobDoc = id
    ? await JobModel.findByIdAndUpdate(id, jobData, { new: true }) // Use { new: true } to return the updated document
    : await JobModel.create(jobData);
  
  // Revalidate path if orgId is present in jobData
  if ('orgId' in jobData) {
    revalidatePath('/jobs/' + jobData.orgId);
  }
  
  // Return the job document
  return JSON.parse(JSON.stringify(jobDoc));
}