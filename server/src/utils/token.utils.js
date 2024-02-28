import jwt from "jsonwebtoken";

const createToken = (data) => {
  const token = jwt.sign(data, process.env.SECRET, {
    expiresIn: 60 * 60 * 24 * 7,
  });
  return token;
};

const verifyToken = (headers) => {
  const token = headers.token;
  if (token) {
    try {
      const data = jwt.verify(token, process.env.SECRET);
      return data;
    } catch (error) {
      if (error instanceof jwt.JsonWebTokenError) {
        throw new Error("Invalid token.");
      } else if (error instanceof jwt.TokenExpiredError) {
        throw new Error("Expired token. Please, log in again.");
      }
    }
  }
  const error = new Error("Token not provided.");
  error.statusCode = 401;
  throw error;
};

export { createToken, verifyToken };
