import has8charUtils from "../utils/has8char.utils.js";

function has8char(req, res, next) {
  try {
    has8charUtils(req.body.password);
    return next();
  } catch (error) {
    next(error);
  }
}

export default has8char;
