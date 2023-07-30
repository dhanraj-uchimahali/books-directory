const jwt = require("jsonwebtoken");
const InvalidAuthenticationException = require("../exceptions/authentication.exception");
const dotenv = require("dotenv");
dotenv.config();

const validateToken = async (request, response, next) => {
  try {
    let token;
    let authHeaders = request.headers.Authorization || request.headers.authorization;
    if(!authHeaders){
      throw new InvalidAuthenticationException("token is missing.")
    }
    if (authHeaders.startsWith("Bearer")) {
      token = authHeaders.split(" ")[1];
    }
    jwt.verify(token, process.env.ACCESS_TOKEN, (error, decoded) => {
      if (error) {
        throw new InvalidAuthenticationException("user is not authorized.");
      }
      request.user = decoded.user;
      next();
    });
  } catch (error) {
    next(error)
  }
};
module.exports = validateToken;
