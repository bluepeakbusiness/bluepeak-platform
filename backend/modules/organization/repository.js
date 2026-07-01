import prisma from '../../config/prisma.js';

function buildWhereClause(query) {
  const where = {};
  const search = query.search?.trim();

  if (search) {
    where.OR = [
      { companyName: { contains: search } },
      { legalName: { contains: search } },
      { email: { contains: search } },
      { gstNumber: { contains: search } },
      { panNumber: { contains: search } },
      { tanNumber: { contains: search } },
      { industry: { contains: search } },
      { country: { contains: search } },
      { city: { contains: search } },
    ];
  }

  if (query.status) {
    where.status = query.status;
  }

  if (query.industry) {
    where.industry = query.industry;
  }

  if (query.country) {
    where.country = query.country;
  }

  if (query.currency) {
    where.currency = query.currency;
  }

  return where;
}

export async function listOrganizationRecords(query = {}) {
  const page = Number(query.page) || 1;
  const pageSize = Number(query.pageSize) || 10;
  const sortBy = query.sortBy || 'createdAt';
  const sortOrder = query.sortOrder === 'asc' ? 'asc' : 'desc';
  const where = buildWhereClause(query);

  const [data, total] = await Promise.all([
    prisma.organization.findMany({
      where,
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: { [sortBy]: sortOrder },
    }),
    prisma.organization.count({ where }),
  ]);

  return {
    data,
    meta: {
      page,
      pageSize,
      total,
      pages: Math.ceil(total / pageSize) || 1,
    },
  };
}

export async function getOrganizationRecordById(id) {
  return prisma.organization.findUnique({ where: { id } });
}

export async function createOrganizationRecord(data) {
  return prisma.organization.create({ data });
}

export async function updateOrganizationRecord(id, data) {
  return prisma.organization.update({ where: { id }, data });
}

export async function deleteOrganizationRecord(id) {
  return prisma.organization.delete({ where: { id } });
}
