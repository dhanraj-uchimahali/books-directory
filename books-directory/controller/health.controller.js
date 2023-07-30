const healthAPI = (request, response, next) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = {};
      resolve(
        response.json({
          success: true,
          message: "Application is running....",
          result: result,
        })
      );
    } catch (error) {
      next(error);
    }
  });
};
module.exports = healthAPI;
