import {
  createOrganizationRecord,
  deleteOrganizationRecord,
  getOrganizationRecordById,
  listOrganizationRecords,
  updateOrganizationRecord,
} from './repository.js';

export async function listOrganizations(query = {}) {
  return listOrganizationRecords(query);
}

export async function getOrganizationById(id) {
  const organization = await getOrganizationRecordById(id);
  if (!organization) {
    throw new Error('Organization not found.');
  }
  return organization;
}

export async function createOrganization(data) {
  return createOrganizationRecord(data);
}

export async function updateOrganization(id, data) {
  const organization = await getOrganizationById(id);
  if (!organization) {
    throw new Error('Organization not found.');
  }
  return updateOrganizationRecord(id, data);
}

export async function deleteOrganization(id) {
  const organization = await getOrganizationById(id);
  if (!organization) {
    throw new Error('Organization not found.');
  }
  return deleteOrganizationRecord(id);
}
