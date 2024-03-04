import { Router } from "express";
import { verifyToken } from "../../utils/token.utils.js";

const formRouter = Router();

formRouter.get("/", (req, res, next) => {
  try {
    let isLoggedIn;
    let isAdmin;
    try {
      const user = verifyToken(req);
      isLoggedIn = true;
      user.role === "admin" ? (isAdmin = true) : (isAdmin = false);
    } catch (error) {
      isLoggedIn = false;
    }
    return res.render("form", {
      title: "Insawear | FORM",
      isLoggedIn: isLoggedIn,
      isAdmin: isAdmin,
    });
  } catch (error) {
    next(error);
  }
});

export default formRouter;
