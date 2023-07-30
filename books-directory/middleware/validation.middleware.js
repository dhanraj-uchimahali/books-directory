const options = {
  abortEarly: false, // include all errors
  allowUnknown: true, // ignore unknown props
  stripUnknown: true, // remove unknown props
};
const validationMiddleware = (schema) => async (request, response, next) => {
  const { error } = schema.validate(request.body, options);
  if (error) {
    console.log(error)
    return response.status(400).json({
      success: false,
      code: "SCHEMA_ERROR",
      message: "Bad Schema",
      stack: error.details.map((e) => e.message),
    });
  }else {
    next()
  }
};
module.exports = validationMiddleware;
