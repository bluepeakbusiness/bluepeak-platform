export function successResponse(
  res,
  message,
  data = null,
  meta = {}
) {

  return res.status(200).json({

    success: true,

    message,

    data,

    meta,

    errors: null,

  });

}

export function createdResponse(
  res,
  message,
  data = null
) {

  return res.status(201).json({

    success: true,

    message,

    data,

    errors: null,

  });

}

export function errorResponse(
  res,
  status,
  message,
  errors = null
) {

  return res.status(status).json({

    success: false,

    message,

    data: null,

    errors,

  });

}