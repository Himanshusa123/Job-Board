'use server';

const { WorkOS } = require('@workos-inc/node');
const { revalidatePath } = require('next/cache');
const { redirect } = require('next/navigation');

const workos = new WorkOS(process.env.WORKOS_API_KEY);

async function createCompany(companyName, userId) {
  const org = await workos.organizations.createOrganization({ name: companyName });
  await workos.userManagement.createOrganizationMembership({
    userId,
    organizationId: org.id,
    roleSlug: 'admin',
  });
  revalidatePath('/new-listing');
  redirect('/new-listing');
}

module.exports = { createCompany };