import { verifyToken } from "../../utils/token.utils.js";
import CustomRouter from "../CustomRouter.js";

export default class FormRouter extends CustomRouter {
  init() {
    this.read("/", ["ADMIN", "PREMIUM"], (req, res, next) => {
      try {
        let isLoggedIn = false;
        let isAdmin = false;
        let isPremium = false;
        try {
          const user = verifyToken(req);
          isLoggedIn = true;
          if (user.role === 1) isAdmin = true;
          if (user.role === 2) isPremium = true;
        } catch (error) {}
        return res.render("form", {
          title: "Insawear | FORM",
          isLoggedIn: isLoggedIn,
          isAdmin: isAdmin,
          isPremium: isPremium
        });
      } catch (error) {
        next(error);
      }
    })
  }
}

