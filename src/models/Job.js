import { AutoPaginatable, OrganizationMembership, User, WorkOS } from "@workos-inc/node";
import mongoose, { model, models, Schema } from 'mongoose';

// Define the Job schema
const JobSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  remote: { type: String, required: true },
  type: { type: String, required: true },
  salary: { type: Number, required: true },
  country: { type: String, required: true },
  state: { type: String, required: true },
  city: { type: String, required: true },
  countryId: { type: String, required: true },
  stateId: { type: String, required: true },
  cityId: { type: String, required: true },
  contactName: { type: String, required: true },
  contactPhone: { type: String, required: true },
  contactEmail: { type: String, required: true },
  orgId: { type: String, required: true },
}, {
  timestamps: true,
});

// Function to add organization and user data
export async function addOrgAndUserData(jobsDocs, user) {
  jobsDocs = JSON.parse(JSON.stringify(jobsDocs)); // Deep clone jobsDocs
  await mongoose.connect(process.env.MONGO_URI);
  const workos = new WorkOS(process.env.WORKOS_API_KEY);
  let oms = null;
  
  // Fetch organization memberships if user is provided
  if (user) {
    oms = await workos.userManagement.listOrganizationMemberships({
      userId: user.id,
    });
  }

  // Iterate through each job document
  for (const job of jobsDocs) {
    const org = await workos.organizations.getOrganization(job.orgId);
    job.orgName = org.name;
    
    // Check if the user is an admin of the organization
    if (oms && oms.data.length > 0) {
      job.isAdmin = !!oms.data.find(om => om.organizationId === job.orgId);
    }
  }
  
  return jobsDocs;
}

// Export the Job model
export const JobModel = models.Job || model('Job', JobSchema);