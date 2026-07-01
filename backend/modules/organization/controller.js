import {
  createOrganization,
  deleteOrganization,
  getOrganizationById,
  listOrganizations,
  updateOrganization,
} from './service.js';
import {
  createOrganizationSchema,
  listOrganizationsQuerySchema,
  updateOrganizationSchema,
} from './validator.js';

function sendResponse(res, status, success, message, data = null, meta = null) {
  return res.status(status).json({ success, message, data, meta });
}

function normalizeError(error) {
  if (error?.name === 'ZodError') {
    return { status: 400, message: error.issues?.[0]?.message || 'Invalid request payload.' };
  }

  if (error?.message === 'Organization not found.') {
    return { status: 404, message: error.message };
  }

  return { status: 500, message: error?.message || 'Internal server error.' };
}

export async function listOrganizationsHandler(req, res) {
  try {
    const parsedQuery = listOrganizationsQuerySchema.parse(req.query);
    const result = await listOrganizations(parsedQuery);
    return sendResponse(res, 200, true, 'Organizations fetched successfully.', result.data, result.meta);
  } catch (error) {
    const normalized = normalizeError(error);
    return sendResponse(res, normalized.status, false, normalized.message);
  }
}

export async function getOrganizationHandler(req, res) {
  try {
    const organization = await getOrganizationById(req.params.id);
    return sendResponse(res, 200, true, 'Organization fetched successfully.', organization);
  } catch (error) {
    const normalized = normalizeError(error);
    return sendResponse(res, normalized.status, false, normalized.message);
  }
}

export async function createOrganizationHandler(req, res) {
  try {
    const parsed = createOrganizationSchema.parse(req.body);
    const organization = await createOrganization(parsed);
    return sendResponse(res, 201, true, 'Organization created successfully.', organization);
  } catch (error) {
    const normalized = normalizeError(error);
    return sendResponse(res, normalized.status, false, normalized.message);
  }
}

export async function updateOrganizationHandler(req, res) {
  try {
    const parsed = updateOrganizationSchema.parse(req.body);
    const organization = await updateOrganization(req.params.id, parsed);
    return sendResponse(res, 200, true, 'Organization updated successfully.', organization);
  } catch (error) {
    const normalized = normalizeError(error);
    return sendResponse(res, normalized.status, false, normalized.message);
  }
}

export async function deleteOrganizationHandler(req, res) {
  try {
    const result = await deleteOrganization(req.params.id);
    return sendResponse(res, 200, true, 'Organization deleted successfully.', result);
  } catch (error) {
    const normalized = normalizeError(error);
    return sendResponse(res, normalized.status, false, normalized.message);
  }
}
