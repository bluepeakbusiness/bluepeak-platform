import { z } from 'zod';

const organizationBaseSchema = z.object({
  companyName: z.string().trim().min(2, 'Company name is required.'),
  legalName: z.string().trim().min(2, 'Legal name is required.').optional().or(z.literal('')),
  gstNumber: z.string().trim().optional().or(z.literal('')),
  panNumber: z.string().trim().optional().or(z.literal('')),
  tanNumber: z.string().trim().optional().or(z.literal('')),
  email: z.string().trim().email('Please provide a valid email.').optional().or(z.literal('')),
  phone: z.string().trim().optional().or(z.literal('')),
  mobile: z.string().trim().optional().or(z.literal('')),
  website: z.string().trim().url('Please provide a valid website URL.').optional().or(z.literal('')),
  industry: z.string().trim().optional().or(z.literal('')),
  country: z.string().trim().optional().or(z.literal('')),
  state: z.string().trim().optional().or(z.literal('')),
  city: z.string().trim().optional().or(z.literal('')),
  address: z.string().trim().optional().or(z.literal('')),
  postalCode: z.string().trim().optional().or(z.literal('')),
  currency: z.string().trim().optional().or(z.literal('INR')),
  timezone: z.string().trim().optional().or(z.literal('Asia/Kolkata')),
  status: z.string().trim().optional().or(z.literal('ACTIVE')),
  notes: z.string().trim().optional().or(z.literal('')),
});

const nullableFields = [
  'legalName',
  'gstNumber',
  'panNumber',
  'tanNumber',
  'email',
  'phone',
  'mobile',
  'website',
  'industry',
  'country',
  'state',
  'city',
  'address',
  'postalCode',
  'notes',
];

function normalizeOrganization(data, applyDefaults) {
  const normalized = { ...data };

  for (const field of nullableFields) {
    if (applyDefaults || Object.prototype.hasOwnProperty.call(data, field)) {
      normalized[field] = data[field] || null;
    }
  }

  const defaults = {
    currency: 'INR',
    timezone: 'Asia/Kolkata',
    status: 'ACTIVE',
  };

  for (const [field, defaultValue] of Object.entries(defaults)) {
    if (applyDefaults || Object.prototype.hasOwnProperty.call(data, field)) {
      normalized[field] = data[field] || defaultValue;
    }
  }

  return normalized;
}

export const createOrganizationSchema = organizationBaseSchema.transform((data) =>
  normalizeOrganization(data, true));

export const updateOrganizationSchema = organizationBaseSchema.partial().transform((data) =>
  normalizeOrganization(data, false));

export const listOrganizationsQuerySchema = z.object({
  page: z.string().optional(),
  pageSize: z.string().optional(),
  search: z.string().optional(),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).optional(),
  status: z.string().optional(),
  industry: z.string().optional(),
  country: z.string().optional(),
  currency: z.string().optional(),
}).transform((data) => ({
  page: Number(data.page) || 1,
  pageSize: Number(data.pageSize) || 10,
  search: data.search,
  sortBy: data.sortBy,
  sortOrder: data.sortOrder,
  status: data.status,
  industry: data.industry,
  country: data.country,
  currency: data.currency,
}));
