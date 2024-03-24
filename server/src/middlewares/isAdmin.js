import { verifyToken } from "../utils/token.utils.js";

export default (req, res, next) => {
  try {
    console.log(req.cookies.token);
    const data = verifyToken(req);
    const { role } = data;
    if (role === "admin") {
      return next();
    } else {
      const error = new Error("forbidden");
      error.statusCode = 403;
      throw error;
    }
  } catch (error) {
    return next(error);
  }
};
