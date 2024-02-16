import isValidPass from "../utils/isValidPass.utils.js";

export default async (req, res, next) => {
  try {
    const { email, password } = req.body;
    await isValidPass(email, password);
    next();
  } catch (error) {
    next(error);
  }
};
