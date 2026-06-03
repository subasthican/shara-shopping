const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 20;
const MAX_LIMIT = 100;

export function getPagination(query = {}) {
  const requested = query.page !== undefined || query.limit !== undefined;

  if (!requested) {
    return { requested: false };
  }

  const page = clampPositiveInteger(query.page, DEFAULT_PAGE);
  const limit = Math.min(clampPositiveInteger(query.limit, DEFAULT_LIMIT), MAX_LIMIT);
  const skip = (page - 1) * limit;

  return { requested, page, limit, skip };
}

export function createPaginatedResponse(data, { page, limit }, total) {
  const totalPages = Math.max(Math.ceil(total / limit), 1);

  return {
    data,
    pagination: {
      page,
      limit,
      total,
      totalPages,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
    },
  };
}

function clampPositiveInteger(value, fallback) {
  const parsed = Number.parseInt(value, 10);

  return Number.isInteger(parsed) && parsed > 0 ? parsed : fallback;
}
